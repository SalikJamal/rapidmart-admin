"use client"

import { useParams, useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { IBillboardColumn } from "@/lib/types"
import { billboardColumns } from "@/components/store/billboards/columns"
import { DataTable } from "@/components/ui/data-table"
import APIList from "@/components/ui/api-list"

interface IBillboardClientProps {
    data: IBillboardColumn[];
}


export default function BillboardClient({ data }: IBillboardClientProps) {

    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Billboards (${data.length})`} description="Manage billboards for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 size-4" />
                    Add New
                </Button>
            </div>

            <Separator />

            <DataTable data={data} columns={billboardColumns} searchKey="label" />
            <Heading title="API" description="API calls for Billboards" />

            <Separator />
            
            <APIList entityName="billboards" entityIdName="billboardId" />
        </>
    )
}