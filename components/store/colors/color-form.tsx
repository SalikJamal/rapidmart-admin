"use client"

import * as z  from "zod"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Color } from "@prisma/client"
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

interface IColorFormProps {
    initialData: Color | null;
}

type ColorFormValues = z.infer<typeof formSchema>
const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    value: z.string()
            .min(4, { message: "Value must be more than four characters" })
            .regex(/^#/, { message: "Value must be a valid hex code "})
})


export default function ColorForm({ initialData }: IColorFormProps) {
    
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const router = useRouter()

    const title = initialData ? "Edit Color" : "Create Color"
    const description = initialData ? "Edit a color" : "Add a new color"
    const toastMessage = initialData ? "Color updated." : "Color created."
    const action = initialData ? "Save changes" : "Create"

    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: ""
        }
    })

    const onDelete = async () => {
        try {

            setLoading(true)
            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`)
            router.push(`/${params.storeId}/colors`)
            router.refresh()
            toast.success("Color deleted.")

        } catch(err) {
            toast.error("Make sure you removed all products using this color first.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    const onSubmit = async (values: ColorFormValues) => {
        try {

            setLoading(true)

            if(initialData) {
                await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, values)
            } else {
                await axios.post(`/api/${params.storeId}/colors`, values)
            }

            router.push(`/${params.storeId}/colors`)
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
                                            placeholder="Color name"
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
                                        <div className="flex items-center gap-x-4">
                                            <Input
                                                placeholder="Color value"
                                                disabled={loading}
                                                {...field}
                                            />
                                            <div className="border border-gray-300 p-4 rounded-full" style={{ backgroundColor: field.value }} />
                                        </div>
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