import prismadb from "@/lib/prismadb"

interface IDashboardPageProps {
    params: {
        storeId: string
    }
}


export default async function DashboardPage({ params }: IDashboardPageProps) {

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    })

    return (
        <div>
            Active Store: {store?.name}
        </div>
    )
}