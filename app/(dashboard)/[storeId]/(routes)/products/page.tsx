import { auth } from "@clerk/nextjs/server"
import { format } from "date-fns"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"
import ProductClient from "@/components/store/products/client"
import { IProductColumn } from "@/lib/types"
import { formatter } from "@/lib/utils"


interface IProductsPageProps {
    params: {
        storeId: string;
    };
}


export default async function ProductsPage({ params }: IProductsPageProps) {
    
    const { userId } = auth()
    if(!userId) redirect("/sign-in")
    
    const products = await prismadb.product.findMany({ 
        where: { 
            storeId: params.storeId 
        },
        include: {
            category: true,
            size: true,
            color: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedProducts: IProductColumn[] = products.map(product => ({
        id: product.id,
        name: product.name,
        price: formatter.format(product.price.toNumber()),
        isFeatured: product.isFeatured,
        isArchived: product.isArchived,
        category: product.category.name,
        size: product.size.name,
        color: product.color.value,
        createdAt: format(product.createdAt, "MMMM do, yyyy")
    }))
    
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductClient data={formattedProducts} />
            </div>
        </div>
    )
}