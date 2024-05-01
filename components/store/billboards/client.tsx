"use client"

import { useParams, useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Billboard } from "@prisma/client"

interface IBillboardClientProps {
    data: Billboard[];
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
        </>
    )
}