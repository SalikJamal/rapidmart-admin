import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

interface IPATCHParams {
    params: {
        storeId: string;
    };
}


export async function PATCH(req: Request, { params }: IPATCHParams) {
    try {

        const { userId } = auth()
        const { name } = await req.json()

        if(!userId) return new NextResponse("Unauthorized", { status: 401 })
        if(!name) return new NextResponse("Name is required", { status: 400 })
        if(!params.storeId) return new NextResponse("Store ID is required", { status: 400 })

        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
        })

        return NextResponse.json(store, { status: 200 })

    } catch(err) {
        console.log(`[STORE_PATCH] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function DELETE(req: Request, { params }: IPATCHParams) {
    try {

        const { userId } = auth()

        if(!userId) return new NextResponse("Unauthorized", { status: 401 })
        if(!params.storeId) return new NextResponse("Store ID is required", { status: 400 })

        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            }
        })

        return NextResponse.json(store, { status: 200 })

    } catch(err) {
        console.log(`[STORE_DELETE] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}