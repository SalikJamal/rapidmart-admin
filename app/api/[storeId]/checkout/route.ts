import Stripe from "stripe"
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import prismadb from "@/lib/prismadb"

interface IParams {
    params: {
        storeId: string;
    };
}


const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
}


export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders })
}


export async function POST(req: Request, { params }: IParams) {

    const { productIds } = await req.json()
    if(!productIds || !productIds.length) return new NextResponse("Product IDs are required", { status: 400 })

    const products = await prismadb.product.findMany({
        where: {
            id: {
                in: productIds
            }
        }
    })

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    products.forEach(product => {
        lineItems.push({
            quantity: 1,
            price_data: {
                currency: "USD",
                unit_amount: product.price.toNumber() * 100,
                product_data: {
                    name: product.name
                },
            }
        })
    })

    const order = await prismadb.order.create({
        data: {
            storeId: params.storeId,
            isPaid: false,
            orderItems: {
                create: productIds.map((productId: string) => ({
                    product: {
                        connect: {
                            id: productId
                        }
                    }
                }))
            }
        }
    })

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        billing_address_collection: "required",
        phone_number_collection: {
            enabled: true
        },
        metadata: {
            orderId: order.id
        },
        success_url: `${process.env.STORE_FRONTEND_URL}/cart?success=1`,
        cancel_url: `${process.env.STORE_FRONTEND_URL}/cart?canceled=1` 
    })

    return NextResponse.json({ url: session.url }, { headers: corsHeaders })

}