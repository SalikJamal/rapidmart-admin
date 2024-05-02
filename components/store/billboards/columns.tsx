"use client"

import { ColumnDef } from "@tanstack/react-table"
import { IBillboardColumn } from "@/lib/types"
import CellAction from "@/components/store/billboards/cell-action"


export const billboardColumns: ColumnDef<IBillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label"
  },
  {
    accessorKey: "createdAt",
    header: "Date"
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
