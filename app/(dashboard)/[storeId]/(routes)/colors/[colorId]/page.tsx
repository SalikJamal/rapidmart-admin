import SizeForm from "@/components/store/sizes/size-form"
import prismadb from "@/lib/prismadb"

interface ISizePageProps {
    params: {
        sizeId: string;
    };
}


export default async function SizePage({ params }: ISizePageProps) {
    
    const size = await prismadb.size.findUnique({
        where: {
            id: params.sizeId
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeForm initialData={size} />
            </div>
        </div>
    )
}