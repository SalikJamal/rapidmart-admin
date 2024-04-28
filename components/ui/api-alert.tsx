import { Alert, AlertTitle } from "@/components/ui/alert"
import { Server } from "lucide-react"

interface IAPIAlertProps {
    title: string;
    description: string;
    variant: "public" | "admin";
}

const textMap: Record<IAPIAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin"
}

const variantMap: Record<IAPIAlertProps["variant"], string> = {
    public: "secondary",
    admin: "destructive"
}


export default function APIAlert({ title, description, variant = "public" }: IAPIAlertProps) {
    return (
        <Alert>
            <Server className="size-4" />
            <AlertTitle className="flex items-center gap-x-2">{title}</AlertTitle>
            
        </Alert>
    )
}