"use client"

import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { IColorColum } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuTrigger, 
    DropdownMenuLabel,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import AlertModal from "@/components/modals/alert-modal"

interface ICellActionProps {
    data: IColorColum;
}


export default function CellAction({ data }: ICellActionProps) {
    
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const router = useRouter()
    const params = useParams()

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Color ID copied to the clipboard.")
    }

    const onDelete = async () => {
        try {

            setLoading(true)
            await axios.delete(`/api/${params.storeId}/colors/${data.id}`)
            router.refresh()
            toast.success("Color deleted.")

        } catch(err) {
            toast.error("Make sure you removed all products using this color first.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }
    
    return (
        <>
            <AlertModal 
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button
                        className="size-8 p-0"
                        variant="ghost"
                    >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 size-4" />
                        Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}>
                        <Edit className="mr-2 size-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 size-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}