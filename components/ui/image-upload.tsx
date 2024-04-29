"use client"

import { useEffect, useState } from "react"
import { ImagePlus, Trash } from "lucide-react"
import Image from "next/image"
import { CldUploadWidget } from "next-cloudinary"
import { Button } from "@/components/ui/button"

interface IImageUploadProps {
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    disabled?: boolean;
}


export default function ImageUpload({ value, onChange, onRemove, disabled }: IImageUploadProps) {
    
    const [isMounted, setIsMounted] = useState(false)

    const onSuccess = (result: any) => {
        onChange(result.info.secure_url)
    }

    useEffect(() => {
        setIsMounted(true)
    }, []) 

    if(!isMounted) return null

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map(url => (
                    <div className="relative size-[200px] rounded-md overflow-hidden" key={url}>
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                variant="destructive"
                                type="button"
                                size="icon"
                                onClick={() => onRemove(url)}
                            >
                                <Trash className="size-4" />
                            </Button>
                        </div>
                        <Image
                            className="object-cover"
                            fill
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget onSuccess={onSuccess} uploadPreset="lesjtn3g">
                {({ open }) => {
                    const onClick = () => open()
                    return (
                        <Button
                            variant="secondary"
                            type="button"
                            disabled={disabled}
                            onClick={onClick}
                        >
                            <ImagePlus className="mr-2 size-4" />
                            Upload an Image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}