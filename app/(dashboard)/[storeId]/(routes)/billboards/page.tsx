import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"
import BillboardClient from "@/components/store/billboards/client"


interface IBillboardsPageProps {
    params: {
        storeId: string;
    };
}


export default async function BillboardsPage({ params }: IBillboardsPageProps) {
    
    const { userId } = auth()
    if(!userId) redirect("/sign-in")
    
    const billboards = await prismadb.billboard.findMany({ 
        where: { 
            storeId: params.storeId 
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={billboards} />
            </div>
        </div>
    )
}