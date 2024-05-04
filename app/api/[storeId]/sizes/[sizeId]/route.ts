import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

interface IParams {
    params: {
        storeId: string;
        sizeId: string;
    };
}

interface IGETParams {
    params: {
        sizeId: string;
    }
}


export async function GET(req: Request, { params }: IGETParams) {
    try {

        if(!params.sizeId) return new NextResponse("Size ID is required", { status: 400 })

        const size = await prismadb.size.findUnique({
            where: {
                id: params.sizeId
            }
        })

        return NextResponse.json(size, { status: 200 })

    } catch(err) {
        console.log(`[SIZE_GET] \n, ${err}`)
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
        if(!params.sizeId) return new NextResponse("Size ID is required", { status: 400 })

        const storeByUserID = await prismadb.store.findFirst({
            where: {
                userId,
                id: params.storeId
            }
        })

        if(!storeByUserID) return new NextResponse("Unauthorized", { status: 403 })

        const size = await prismadb.size.updateMany({
            where: {
                id: params.sizeId,
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(size, { status: 200 })

    } catch(err) {
        console.log(`[SIZE_PATCH] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function DELETE(req: Request, { params }: IParams) {
    try {

        const { userId } = auth()

        if(!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if(!params.sizeId) return new NextResponse("Size ID is required", { status: 400 })

        const storeByUserID = await prismadb.store.findFirst({
            where: {
                userId,
                id: params.storeId
            }
        })

        if(!storeByUserID) return new NextResponse("Unauthorized", { status: 403 })

        const size = await prismadb.size.deleteMany({
            where: {
                id: params.sizeId
            }
        })

        return NextResponse.json(size, { status: 200 })

    } catch(err) {
        console.log(`[SIZE_DELETE] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}