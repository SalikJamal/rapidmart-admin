"use client"

import axios from "axios"
import { useState } from "react"
import * as z  from "zod"
import { useForm } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Product } from "@prisma/client"
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
import ImageUpload from "@/components/ui/image-upload"

interface IProductFormProps {
    initialData: Product | null;
}

type ProductFormValues = z.infer<typeof formSchema>
const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    imageURL: z.string().min(1, { message: "Image URL is required" })
})



export default function ProductForm({ initialData }: IProductFormProps) {
    
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const router = useRouter()

    const title = initialData ? "Edit Product" : "Create Product"
    const description = initialData ? "Edit a product" : "Add a new product"
    const toastMessage = initialData ? "Product updated." : "Product created."
    const action = initialData ? "Save changes" : "Create"

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            imageURL: ""
        }
    })

    const onDelete = async () => {
        try {

            setLoading(true)
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
            router.push(`/${params.storeId}/products`)
            router.refresh()
            toast.success("Product deleted.")

        } catch(err) {
            toast.error("Make sure you removed all billboards using this product first.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    const onSubmit = async (values: ProductFormValues) => {
        try {

            setLoading(true)

            if(initialData) {
                await axios.patch(`/api/${params.storeId}/products/${params.productId}`, values)
            } else {
                await axios.post(`/api/${params.storeId}/products`, values)
            }

            router.push(`/${params.storeId}/products`)
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
                    <FormField 
                        control={form.control}
                        name="imageURL"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Image</FormLabel>
                                <FormControl>
                                    <ImageUpload 
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={url => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Product name"
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