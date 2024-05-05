import { auth } from "@clerk/nextjs/server"
import { format } from "date-fns"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"
import ColorClient from "@/components/store/colors/client"
import { IColorColum } from "@/lib/types"


interface IColorsPageProps {
    params: {
        storeId: string;
    };
}


export default async function ColorsPage({ params }: IColorsPageProps) {
    
    const { userId } = auth()
    if(!userId) redirect("/sign-in")
    
    const colors = await prismadb.color.findMany({ 
        where: { 
            storeId: params.storeId 
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedColors: IColorColum[] = colors.map(color => ({
        id: color.id,
        name: color.name,
        value: color.value,
        createdAt: format(color.createdAt, "MMMM do, yyyy")
    }))
    
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorClient data={formattedColors} />
            </div>
        </div>
    )
}