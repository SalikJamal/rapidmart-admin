"use client"

import { useParams, useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ISizeColumn } from "@/lib/types"
import { sizeColumns } from "@/components/store/sizes/columns"
import { DataTable } from "@/components/ui/data-table"
import APIList from "@/components/ui/api-list"

interface ISizeClientProps {
    data: ISizeColumn[];
}


export default function SizeClient({ data }: ISizeClientProps) {

    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Sizes (${data.length})`} description="Manage sizes for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="mr-2 size-4" />
                    Add New
                </Button>
            </div>

            <Separator />

            <DataTable data={data} columns={sizeColumns} searchKey="label" />
            <Heading title="API" description="API calls for Sizes" />

            <Separator />
            
            <APIList entityName="sizes" entityIdName="sizeId" />
        </>
    )
}