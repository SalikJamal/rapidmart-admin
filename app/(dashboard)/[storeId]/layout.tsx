import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import Navbar from "@/components/navbar"
import prismadb from "@/lib/prismadb"
import { IReactChildren } from "@/lib/types"

interface IDashboardLayoutProps extends IReactChildren {
    params: {
        storeId: string
    }
}


export default async function DashboardLayout({ children, params }: IDashboardLayoutProps) {
    
    const { userId } = auth()
    if(!userId) redirect("/sign-in")
    
    const store = await prismadb.store.findFirst({ 
        where: { 
            id: params.storeId, 
            userId 
        } 
    })

    if(!store) redirect("/")

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}