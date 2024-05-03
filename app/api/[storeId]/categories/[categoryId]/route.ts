import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

interface IParams {
    params: {
        storeId: string;
        categoryId: string;
    };
}

interface IGETParams {
    params: {
        categoryId: string;
    }
}


export async function GET(req: Request, { params }: IGETParams) {
    try {

        if(!params.categoryId) return new NextResponse("Category ID is required", { status: 400 })

        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId
            }
        })

        return NextResponse.json(category, { status: 200 })

    } catch(err) {
        console.log(`[CATEGORY_GET] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function PATCH(req: Request, { params }: IParams) {
    try {

        const { userId } = auth()
        const { name, billboardId } = await req.json()

        if(!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if(!name) return new NextResponse("Category Name is required", { status: 400 })
        if(!billboardId) return new NextResponse("Billboard Id is required", { status: 400 })
        if(!params.categoryId) return new NextResponse("Category ID is required", { status: 400 })

        const storeByUserID = await prismadb.store.findFirst({
            where: {
                userId,
                id: params.storeId
            }
        })

        if(!storeByUserID) return new NextResponse("Unauthorized", { status: 403 })

        const category = await prismadb.category.updateMany({
            where: {
                id: params.categoryId,
                storeId: params.storeId
            },
            data: {
                name,
                billboardId
            }
        })

        return NextResponse.json(category, { status: 200 })

    } catch(err) {
        console.log(`[CATEGORY_PATCH] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function DELETE(req: Request, { params }: IParams) {
    try {

        const { userId } = auth()

        if(!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if(!params.categoryId) return new NextResponse("Category ID is required", { status: 400 })

        const storeByUserID = await prismadb.store.findFirst({
            where: {
                userId,
                id: params.storeId
            }
        })

        if(!storeByUserID) return new NextResponse("Unauthorized", { status: 403 })

        const category = await prismadb.category.deleteMany({
            where: {
                id: params.categoryId
            }
        })

        return NextResponse.json(category, { status: 200 })

    } catch(err) {
        console.log(`[CATEGORY_DELETE] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}