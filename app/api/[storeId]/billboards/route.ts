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
        const { label, imageURL } = await req.json()

        if(!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if(!label) return new NextResponse("Label is required", { status: 400 })
        if(!imageURL) return new NextResponse("Image URL is required", { status: 400 })
        if(!params.storeId) return new NextResponse("Store ID is required", { status: 400 })

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageURL,
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboard, { status: 200 })

    } catch(err) {
        console.log(`[BILLBOARD_POST] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function GET(req: Request, { params }: IParams) {
    try {

        const { userId } = auth()
        if(!userId) return new NextResponse("Unauthenticated", { status: 401 })

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