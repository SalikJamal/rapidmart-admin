"use client"

import { ColumnDef } from "@tanstack/react-table"
import { IColorColum } from "@/lib/types"
import CellAction from "@/components/store/colors/cell-action"


export const colorColumns: ColumnDef<IColorColum>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div className="size-6 rounded-full border" style={{ backgroundColor: row.original.value }} />
      </div>
    )
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
