"use client"

import { ColumnDef } from "@tanstack/react-table"

export interface IBillboardColumn {
  id: string;
  label: string;
  createdAt: string;
}


export const columns: ColumnDef<IBillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label"
  },
  {
    accessorKey: "createdAt",
    header: "Date"
  }
]
