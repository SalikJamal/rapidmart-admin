"use client"

import * as z  from "zod"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Size } from "@prisma/client"
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

interface ISizeFormProps {
    initialData: Size | null;
}

type SizeFormValues = z.infer<typeof formSchema>
const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    value: z.string().min(1, { message: "Value is required" })
})



export default function SizeForm({ initialData }: ISizeFormProps) {
    
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const router = useRouter()

    const title = initialData ? "Edit Size" : "Create Size"
    const description = initialData ? "Edit a size" : "Add a new size"
    const toastMessage = initialData ? "Size updated." : "Size created."
    const action = initialData ? "Save changes" : "Create"

    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: ""
        }
    })

    const onDelete = async () => {
        try {

            setLoading(true)
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.push(`/${params.storeId}/sizes`)
            router.refresh()
            toast.success("Size deleted.")

        } catch(err) {
            toast.error("Make sure you removed all products using this size first.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    const onSubmit = async (values: SizeFormValues) => {
        try {

            setLoading(true)

            if(initialData) {
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, values)
            } else {
                await axios.post(`/api/${params.storeId}/sizes`, values)
            }

            router.push(`/${params.storeId}/sizes`)
            router.refresh()
            toast.success(toastMessage)

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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Size name"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Size value"
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