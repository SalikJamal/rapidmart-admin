"use client"

import { IBillboardColumn } from "./columns"

interface ICellActionProps {
    data: IBillboardColumn;
}


export default function CellAction({ data }: ICellActionProps) {
    return (
        <div>
            Action
        </div>
    )
}