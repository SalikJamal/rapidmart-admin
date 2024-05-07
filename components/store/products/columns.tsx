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
    accessorKey: "price",
    header: "Price"
  },
  {
    accessorKey: "isArchived",
    header: "Archived"
  },
  {
    accessorKey: "isFeatured",
    header: "Featured"
  },
  {
    accessorKey: "category",
    header: "Category"
  },
  {
    accessorKey: "size",
    header: "Size"
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div className="size-6 rounded-full border" style={{ backgroundColor: row.original.color }} />
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
