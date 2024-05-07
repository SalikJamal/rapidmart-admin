import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

interface IParams {
    params: {
        storeId: string;
    };
}


export async function POST(req: Request, { params }: IParams) {
    try {

        const { userId } = auth()
        const { 
            name, 
            price,
            sizeId,
            categoryId,
            colorId,
            images,
            isFeatured,
            isArchived
        } = await req.json()

        if(!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if(!name) return new NextResponse("Name is required", { status: 400 })
        if(!images || !images.length) return new NextResponse("Images are required", { status: 400 })
        if(!price) return new NextResponse("Price is required", { status: 400 })
        if(!sizeId) return new NextResponse("Size ID is required", { status: 400 })
        if(!categoryId) return new NextResponse("Category ID is required", { status: 400 })
        if(!colorId) return new NextResponse("Color ID is required", { status: 400 })
        if(!params.storeId) return new NextResponse("Store ID is required", { status: 400 })

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                sizeId,
                categoryId,
                colorId,
                isFeatured,
                isArchived,
                images: {
                    createMany: {
                        data: [...images.map((image: { url: string; }) => image)]
                    }
                },
                storeId: params.storeId
            }
        })



        return NextResponse.json(product, { status: 200 })

    } catch(err) {
        console.log(`[PRODUCT_POST] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function GET(req: Request, { params }: IParams) {
    try {

        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get("categoryId") || undefined
        const colorId = searchParams.get("colorId") || undefined
        const sizeId = searchParams.get("sizeId") || undefined
        const isFeatured = searchParams.get("isFeatured")

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                sizeId,
                colorId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                size: true,
                category: true,
                color: true,
                images: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(products, { status: 200 })

    } catch(err) {
        console.log(`[PRODUCTS_GET] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}