import prismadb from "@/lib/prismadb"
import { IReactChildren } from "@/lib/types"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


export default async function SetupLayout({ children }: IReactChildren) {

    const { userId } = auth()
    if(!userId) redirect("/sign-in")

    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    })

    if(store) redirect(`/${store.id}`)

    return (
        <>
            {children}
        </>
    )
}