"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react"
import { Store } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useStoreModal } from "@/hooks/useStoreModal"
import { 
    Command, 
    CommandEmpty, 
    CommandGroup, 
    CommandInput, 
    CommandItem, 
    CommandList, 
    CommandSeparator 
} from "@/components/ui/command"


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>
interface IStoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
}


export default function StoreSwitcher({ className, items = [] }: IStoreSwitcherProps) {
    
    const [open, setOpen] = useState(false)

    const storeModal = useStoreModal()
    const params = useParams()
    const router = useRouter()

    const formattedItems = items.map(item => ({
        label: item.name,
        id: item.id
    }))

    const currentStore = formattedItems.find(item => item.id === params.storeId)
    
    const onStoreSelect = (store: { id: string, label: string }) => {
        setOpen(false)
        router.push(`/${store.id}`)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    className={cn("w-[200px] justify-between", className)}
                    variant="outline" 
                    size="sm" 
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                >
                    <StoreIcon className="mr-2 size-4" />
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store..." />
                        <CommandEmpty>No stores found.</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map(store => (
                                <CommandItem 
                                    className="text-sm"
                                    value={store.id}
                                    disabled={false}
                                    key={store.id} 
                                    onSelect={() => onStoreSelect(store)}
                                >
                                    <StoreIcon className="mr-2 size-4" />
                                        {store.label}
                                    <Check 
                                        className={cn(
                                            "ml-auto size-4", 
                                            currentStore?.id === store.id ? "opacity-100" : "opacity-0"
                                        )} 
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                disabled={false}
                                onSelect={() => { 
                                    setOpen(false); 
                                    storeModal.onOpen();
                                }}
                            >
                                <PlusCircle className="mr-2 size-5" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}