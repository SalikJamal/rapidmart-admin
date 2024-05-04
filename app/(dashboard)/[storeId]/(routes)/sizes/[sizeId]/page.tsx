import BillboardForm from "@/components/store/billboards/billboard-form"
import prismadb from "@/lib/prismadb"

interface IBillboardPageProps {
    params: {
        billboardId: string;
    };
}


export default async function BillboardPage({ params }: IBillboardPageProps) {
    
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm initialData={billboard} />
            </div>
        </div>
    )
}