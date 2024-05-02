"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ICategoryColumn } from "@/lib/types"
import CellAction from "@/components/store/categories/cell-action"


export const categoryColumn: ColumnDef<ICategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "billboardLabel",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel
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
