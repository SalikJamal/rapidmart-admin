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
        const { name, value } = await req.json()

        if(!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if(!name) return new NextResponse("Name is required", { status: 400 })
        if(!value) return new NextResponse("Value is required", { status: 400 })
        if(!params.storeId) return new NextResponse("Store ID is required", { status: 400 })

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId) return new NextResponse("Unauthorized", { status: 403 })

        const color = await prismadb.color.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        })

        return NextResponse.json(color, { status: 200 })

    } catch(err) {
        console.log(`[COLOR_POST] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function GET(req: Request, { params }: IParams) {
    try {

        const colors = await prismadb.color.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(colors, { status: 200 })

    } catch(err) {
        console.log(`[COLOR_GET] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}