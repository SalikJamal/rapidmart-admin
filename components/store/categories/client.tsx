"use client"

import { useParams, useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ICategoryColumn } from "@/lib/types"
import { categoryColumn } from "@/components/store/categories/columns"
import { DataTable } from "@/components/ui/data-table"
import APIList from "@/components/ui/api-list"

interface ICategoryClientProps {
    data: ICategoryColumn[];
}


export default function CategoryClient({ data }: ICategoryClientProps) {

    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Categories (${data.length})`} description="Manage categories for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="mr-2 size-4" />
                    Add New
                </Button>
            </div>

            <Separator />

            <DataTable data={data} columns={categoryColumn} searchKey="name" />
            <Heading title="API" description="API calls for Categories" />

            <Separator />
            
            <APIList entityName="categories" entityIdName="categoryId" />
        </>
    )
}