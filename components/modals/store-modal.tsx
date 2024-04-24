"use client"

import * as z from "zod"
import { useState } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { Modal } from "@/components/ui/modal"
import { useStoreModal } from "@/hooks/useStoreModal"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
    name: z.string({ required_error: "Name is required" }).min(1, { message: "Name is required" })
})


export default function StoreModal() {

    const [loading, setLoading] = useState(false)

    const storeModal = useStoreModal()
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            
            setLoading(true)
            const res = await axios.post("/api/stores", values)

            console.log(res.data)

        } catch(err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title="Create store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField 
                                control={form.control} 
                                name="name" 
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="E-Commerce"
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />

                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button 
                                    variant="outline" 
                                    onClick={storeModal.onClose}
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                                <Button disabled={loading} type="submit">Continue</Button>
                            </div>
                        </form> 
                    </Form>
                </div>
            </div>
        </Modal>
    )
    
}