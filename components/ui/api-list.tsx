"use client"

import { useParams } from "next/navigation"
import useOrigin from "@/hooks/useOrigin"
import APIAlert from "@/components/ui/api-alert"

interface IAPIListProps {
    entityName: string;
    entityIdName: string;
}


export default function APIList({ entityName, entityIdName }: IAPIListProps) {
    
    const params = useParams()
    const origin = useOrigin()

    const baseURL = `${origin}/api/${params.storeId}`
    
    return (
        <>
            <APIAlert 
                title="GET"
                variant="public"
                description={`${baseURL}/${entityName}`}
            />

            <APIAlert 
                title="GET"
                variant="public"
                description={`${baseURL}/${entityName}/{${entityIdName}}`}
            />

            <APIAlert 
                title="POST"
                variant="admin"
                description={`${baseURL}/${entityName}`}
            />

            <APIAlert 
                title="PATCH"
                variant="admin"
                description={`${baseURL}/${entityName}/{${entityIdName}}`}
            />

            <APIAlert 
                title="DELETE"
                variant="admin"
                description={`${baseURL}/${entityName}/{${entityIdName}}`}
            />

        </>
    )
}