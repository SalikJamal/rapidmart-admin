import ColorForm from "@/components/store/colors/color-form"
import prismadb from "@/lib/prismadb"

interface IColorPageProps {
    params: {
        colorId: string;
    };
}


export default async function ColorPage({ params }: IColorPageProps) {
    
    const size = await prismadb.size.findUnique({
        where: {
            id: params.colorId
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorForm initialData={size} />
            </div>
        </div>
    )
}