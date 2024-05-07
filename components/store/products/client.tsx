"use client"

import { useParams, useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { IProductColumn } from "@/lib/types"
import { productColumns } from "@/components/store/products/columns"
import { DataTable } from "@/components/ui/data-table"
import APIList from "@/components/ui/api-list"

interface IProductClientProps {
    data: IProductColumn[];
}


export default function ProductClient({ data }: IProductClientProps) {

    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Products (${data.length})`} description="Manage products for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="mr-2 size-4" />
                    Add New
                </Button>
            </div>

            <Separator />

            <DataTable data={data} columns={productColumns} searchKey="name" />
            <Heading title="API" description="API calls for Products" />

            <Separator />
            
            <APIList entityName="products" entityIdName="productId" />
        </>
    )
}