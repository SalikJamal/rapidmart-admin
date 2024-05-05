import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

interface IParams {
    params: {
        storeId: string;
        colorId: string;
    };
}

interface IGETParams {
    params: {
        colorId: string;
    }
}


export async function GET(req: Request, { params }: IGETParams) {
    try {

        if(!params.colorId) return new NextResponse("Color ID is required", { status: 400 })

        const color = await prismadb.color.findUnique({
            where: {
                id: params.colorId
            }
        })

        return NextResponse.json(color, { status: 200 })

    } catch(err) {
        console.log(`[COLOR_GET] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function PATCH(req: Request, { params }: IParams) {
    try {

        const { userId } = auth()
        const { name, value } = await req.json()

        if(!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if(!name) return new NextResponse("Name is required", { status: 400 })
        if(!value) return new NextResponse("Value is required", { status: 400 })
        if(!params.colorId) return new NextResponse("Color ID is required", { status: 400 })

        const storeByUserID = await prismadb.store.findFirst({
            where: {
                userId,
                id: params.storeId
            }
        })

        if(!storeByUserID) return new NextResponse("Unauthorized", { status: 403 })

        const color = await prismadb.color.updateMany({
            where: {
                id: params.colorId,
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(color, { status: 200 })

    } catch(err) {
        console.log(`[COLOR_PATCH] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function DELETE(req: Request, { params }: IParams) {
    try {

        const { userId } = auth()

        if(!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if(!params.colorId) return new NextResponse("Color ID is required", { status: 400 })

        const storeByUserID = await prismadb.store.findFirst({
            where: {
                userId,
                id: params.storeId
            }
        })

        if(!storeByUserID) return new NextResponse("Unauthorized", { status: 403 })

        const color = await prismadb.color.deleteMany({
            where: {
                id: params.colorId
            }
        })

        return NextResponse.json(color, { status: 200 })

    } catch(err) {
        console.log(`[COLOR_DELETE] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}