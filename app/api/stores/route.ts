import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {

        const { userId } = auth()
        const { name } = await req.json()

        if(!userId) return new NextResponse("Unauthorized", { status: 401 })
        if(!name) return new NextResponse("Name is required", { status: 400 })
        
        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        })

        return NextResponse.json(store, { status: 200 })

    } catch(err) {
        console.log(`[STORES_POST] \n, ${err}`)
        return new NextResponse("Internal Error", { status: 500 })
    }
}