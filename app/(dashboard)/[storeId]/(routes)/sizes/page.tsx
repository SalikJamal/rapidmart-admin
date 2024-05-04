import { auth } from "@clerk/nextjs/server"
import { format } from "date-fns"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"
import SizeClient from "@/components/store/sizes/client"
import { ISizeColumn } from "@/lib/types"


interface ISizesPageProps {
    params: {
        storeId: string;
    };
}


export default async function SizesPage({ params }: ISizesPageProps) {
    
    const { userId } = auth()
    if(!userId) redirect("/sign-in")
    
    const sizes = await prismadb.size.findMany({ 
        where: { 
            storeId: params.storeId 
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedSizes: ISizeColumn[] = sizes.map(size => ({
        id: size.id,
        name: size.name,
        value: size.value,
        createdAt: format(size.createdAt, "MMMM do, yyyy")
    }))
    
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient data={formattedSizes} />
            </div>
        </div>
    )
}