import { useEffect, useState } from "react"


export default function useOrigin() {

    const [mounted, setMounted] = useState(false)
    const origin = window?.location?.origin ?? ""

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null

    return origin
}