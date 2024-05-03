import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

interface IParams {
    params: {
        storeId: string;
        billboardId: string;
    };
}

interface IGETParams {
    params: {
        billboardId: string;
    }
}


export async function GET(req: Request, { params }: IGETParams) {
    try {

        if(!params.billboardId) return new NextResponse("Billboard ID is required", { status: 400 })

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId
            }
        })

        return NextResponse.json(billboard, { status: 200 })

    } catch(err) {
        console.log(`[BILLBOARD_GET] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function PATCH(req: Request, { params }: IParams) {
    try {

        const { userId } = auth()
        const { label, imageURL } = await req.json()

        if(!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if(!label) return new NextResponse("Label is required", { status: 400 })
        if(!imageURL) return new NextResponse("Image URL is required", { status: 400 })
        if(!params.billboardId) return new NextResponse("Billboard ID is required", { status: 400 })

        const storeByUserID = await prismadb.store.findFirst({
            where: {
                userId,
                id: params.storeId
            }
        })

        if(!storeByUserID) return new NextResponse("Unauthorized", { status: 403 })

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId,
            },
            data: {
                label,
                imageURL
            }
        })

        return NextResponse.json(billboard, { status: 200 })

    } catch(err) {
        console.log(`[BILLBOARD_PATCH] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function DELETE(req: Request, { params }: IParams) {
    try {

        const { userId } = auth()

        if(!userId) return new NextResponse("Unauthenticated", { status: 401 })
        if(!params.billboardId) return new NextResponse("Billboard ID is required", { status: 400 })

        const storeByUserID = await prismadb.store.findFirst({
            where: {
                userId,
                id: params.storeId
            }
        })

        if(!storeByUserID) return new NextResponse("Unauthorized", { status: 403 })

        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId
            }
        })

        return NextResponse.json(billboard, { status: 200 })

    } catch(err) {
        console.log(`[BILLBOARD_DELETE] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}