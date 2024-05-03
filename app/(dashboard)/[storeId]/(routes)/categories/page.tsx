import { auth } from "@clerk/nextjs/server"
import { format } from "date-fns"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"
import { ICategoryColumn } from "@/lib/types"
import CategoryClient from "@/components/store/categories/client"


interface ICategoriesPageProps {
    params: {
        storeId: string;
    };
}


export default async function CategoriesPage({ params }: ICategoriesPageProps) {
    
    const { userId } = auth()
    if(!userId) redirect("/sign-in")
    
    const categories = await prismadb.category.findMany({ 
        where: { 
            storeId: params.storeId
        },
        include: {
            billboard: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedCategories: ICategoryColumn[] = categories.map(category => ({
        id: category.id,
        name : category.name,
        billboardLabel: category.billboard.label,
        createdAt: format(category.createdAt, "MMMM do, yyyy")
    }))
    
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={formattedCategories} />
            </div>
        </div>
    )
}