"use client"


import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { IOrderColumn } from "@/lib/types"
import { orderColumns } from "@/components/store/orders/columns"
import { DataTable } from "@/components/ui/data-table"

interface IOrderClientProps {
    data: IOrderColumn[];
}


export default function OrderClient({ data }: IOrderClientProps) {

    return (
        <>
            <Heading title={`Orders (${data.length})`} description="Manage orders for your store" />
            <Separator />
            <DataTable data={data} columns={orderColumns} searchKey="products" />            
        </>
    )
}