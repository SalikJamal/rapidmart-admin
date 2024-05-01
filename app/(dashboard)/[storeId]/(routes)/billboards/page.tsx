import { auth } from "@clerk/nextjs/server"
import { format } from "date-fns"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"
import BillboardClient from "@/components/store/billboards/client"
import { IBillboardColumn } from "@/components/store/billboards/columns"


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

    const formattedBillboards: IBillboardColumn[] = billboards.map(billboard => ({
        id: billboard.id,
        label: billboard.label,
        createdAt: format(billboard.createdAt, "MMMM do, yyyy")
    }))
    
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedBillboards} />
            </div>
        </div>
    )
}