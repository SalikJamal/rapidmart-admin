"use client"

import toast from "react-hot-toast"
import { Clipboard, Server } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge, BadgeProps } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface IAPIAlertProps {
    title: string;
    description: string;
    variant: "public" | "admin";
}

const textMap: Record<IAPIAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin"
}

const variantMap: Record<IAPIAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
}


export default function APIAlert({ title, description, variant = "public"}: IAPIAlertProps) {
    
    const onCopy = () => {
        navigator.clipboard.writeText(description)
        toast.success("API Route copied to the clipboard.")
    }

    return (
        <Alert>
            <Server className="size-4" />
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="mt4 flex items-center justify-between">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {description}
                </code>
                <Button 
                    variant="outline"
                    size="sm"
                    onClick={onCopy}
                >
                    <Clipboard className="size-4" />                    
                </Button>
            </AlertDescription>
        </Alert>
    )
}