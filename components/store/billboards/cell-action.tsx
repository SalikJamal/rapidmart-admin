"use client"

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { IBillboardColumn } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuTrigger, 
    DropdownMenuLabel,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"

interface ICellActionProps {
    data: IBillboardColumn;
}


export default function CellAction({ data }: ICellActionProps) {
    return (
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
                <DropdownMenuItem>
                    <Copy  className="mr-2 size-4" />
                    Copy ID
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Edit className="mr-2 size-4" />
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Trash  className="mr-2 size-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}