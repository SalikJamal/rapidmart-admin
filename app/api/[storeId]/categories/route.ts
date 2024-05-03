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
        const { name, billboardId } = await req.json()

        if(!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if(!name) return new NextResponse("Category Name is required", { status: 400 })
        if(!billboardId) return new NextResponse("Billboard URL is required", { status: 400 })
        if(!params.storeId) return new NextResponse("Store ID is required", { status: 400 })

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })

        const category = await prismadb.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId
            }
        })

        return NextResponse.json(category, { status: 200 })

    } catch(err) {
        console.log(`[CATEGORY_POST] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function GET(req: Request, { params }: IParams) {
    try {

        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboards, { status: 200 })

    } catch(err) {
        console.log(`[BILLBOARD_GET] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}