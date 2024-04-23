import { IReactChildren } from "@/lib/types"


export default function AuthLayout({ children }: IReactChildren) {
    return (
        <div className="flex items-center justify-center h-full">
            {children}
        </div>
    )
}