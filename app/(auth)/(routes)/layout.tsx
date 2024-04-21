import { IReactChildren } from "@/lib/type"


export default function AuthLayout({ children }: IReactChildren) {
    return (
        <div className="flex items-center justify-center h-full">
            {children}
        </div>
    )
}