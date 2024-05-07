"use client"

import { ColumnDef } from "@tanstack/react-table"
import { IProductColumn } from "@/lib/types"
import CellAction from "@/components/store/products/cell-action"


export const productColumns: ColumnDef<IProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name"
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
