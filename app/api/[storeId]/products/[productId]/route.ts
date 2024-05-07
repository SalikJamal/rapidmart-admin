import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

interface IParams {
    params: {
        storeId: string;
        productId: string;
    };
}

interface IGETParams {
    params: {
        productId: string;
    }
}


export async function GET(req: Request, { params }: IGETParams) {
    try {

        if(!params.productId) return new NextResponse("Product ID is required", { status: 400 })

        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true
            }
        })

        return NextResponse.json(product, { status: 200 })

    } catch(err) {
        console.log(`[PRODUCT_GET] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function PATCH(req: Request, { params }: IParams) {
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
        if(!params.productId) return new NextResponse("Product ID is required", { status: 400 })

        const storeByUserID = await prismadb.store.findFirst({
            where: {
                userId,
                id: params.storeId
            }
        })

        if(!storeByUserID) return new NextResponse("Unauthorized", { status: 403 })

        await prismadb.product.update({
            where: {
                id: params.productId,
            },
            data: {
                name,
                price,
                sizeId,
                categoryId,
                colorId,
                isFeatured,
                isArchived,
                images: {
                    deleteMany: {}
                },
                storeId: params.storeId
            }
        })

        const product = await prismadb.product.update({
            where: {
                id: params.productId,
            },
            data: {
                images: {
                    createMany: {
                        data: [...images.map((image: { url: string; }) => image)]
                    }
                }
            }
        })

        return NextResponse.json(product, { status: 200 })

    } catch(err) {
        console.log(`[PRODUCT_PATCH] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function DELETE(req: Request, { params }: IParams) {
    try {

        const { userId } = auth()

        if(!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if(!params.productId) return new NextResponse("Product ID is required", { status: 400 })

        const storeByUserID = await prismadb.store.findFirst({
            where: {
                userId,
                id: params.storeId
            }
        })

        if(!storeByUserID) return new NextResponse("Unauthorized", { status: 403 })

        const product = await prismadb.product.deleteMany({
            where: {
                id: params.productId
            }
        })

        return NextResponse.json(product, { status: 200 })

    } catch(err) {
        console.log(`[PRODUCT_DELETE] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}