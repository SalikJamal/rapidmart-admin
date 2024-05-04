"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ISizeColumn } from "@/lib/types"
import CellAction from "@/components/store/billboards/cell-action"


export const sizeColumns: ColumnDef<ISizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "value",
    header: "Value"
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
