"use client"

import { useParams, useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { IColorColum } from "@/lib/types"
import { colorColumns } from "@/components/store/colors/columns"
import { DataTable } from "@/components/ui/data-table"
import APIList from "@/components/ui/api-list"

interface IColorClientProps {
    data: IColorColum[];
}


export default function ColorClient({ data }: IColorClientProps) {

    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Colors (${data.length})`} description="Manage colors for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                    <Plus className="mr-2 size-4" />
                    Add New
                </Button>
            </div>

            <Separator />

            <DataTable data={data} columns={colorColumns} searchKey="name" />
            <Heading title="API" description="API calls for Colors" />

            <Separator />
            
            <APIList entityName="colors" entityIdName="colorId" />
        </>
    )
}