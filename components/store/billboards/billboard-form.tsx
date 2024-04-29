"use client"

import axios from "axios"
import { useState } from "react"
import * as z  from "zod"
import { useForm } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard } from "@prisma/client"
import toast from "react-hot-toast"
import { Trash } from "lucide-react"
import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage
} from "@/components/ui/form"
import AlertModal from "@/components/modals/alert-modal"
import APIAlert from "@/components/ui/api-alert"
import useOrigin from "@/hooks/useOrigin"

interface IBillboardFormProps {
    initialData: Billboard | null;
}

type BillboardFormValues = z.infer<typeof formSchema>
const formSchema = z.object({
    label: z.string().min(1, { message: "Name is required" }),
    imageURL: z.string().min(1, { message: "Image URL is required" })
})



export default function BillboardForm({ initialData }: IBillboardFormProps) {
    
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()

    const title = initialData ? "Edit Billboard" : "Create Billboard"
    const description = initialData ? "Edit billboard" : "Add a new billboard"
    const toastMessage = initialData ? "Billboard updated." : "Billboard created."
    const action = initialData ? "Save changes" : "Create"

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: "",
            imageURL: ""
        }
    })

    const onDelete = async () => {
        try {

            setLoading(true)
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push("/")
            toast.success("Store deleted.")

        } catch(err) {
            toast.error("Make sure you removed all products and categories first.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    const onSubmit = async (values: BillboardFormValues) => {
        try {

            setLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`, values)
            router.refresh()
            toast.success("Store updated.")

        } catch(err) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <>
            <AlertModal 
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                
                {initialData && (
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => setOpen(true)}
                        disabled={loading}
                    >
                        <Trash className="size-4" />
                    </Button>
                )}
            </div>

            <Separator />

            <Form {...form}>
                <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Billboard label"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button 
                        type="submit" 
                        disabled={loading}
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}