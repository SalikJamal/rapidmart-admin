"use client"

import { ColumnDef } from "@tanstack/react-table"
import { IOrderColumn } from "@/lib/types"


export const orderColumns: ColumnDef<IOrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products"
  },
  {
    accessorKey: "phone",
    header: "Phone"
  },
  {
    accessorKey: "address",
    header: "Address"
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price"
  },
  {
    accessorKey: "isPaid",
    header: "Paid"
  },
  {
    accessorKey: "createdAt",
    header: "Date"
  }
]
