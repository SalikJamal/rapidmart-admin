"use client"

import { ColumnDef } from "@tanstack/react-table"
import { IColorColum } from "@/lib/types"
import CellAction from "@/components/store/sizes/cell-action"


export const colorColumns: ColumnDef<IColorColum>[] = [
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
