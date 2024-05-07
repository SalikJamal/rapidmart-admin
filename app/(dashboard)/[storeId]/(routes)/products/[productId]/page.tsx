import ProductForm from "@/components/store/products/product-form"
import prismadb from "@/lib/prismadb"

interface IProductPageProps {
    params: {
        productId: string;
    };
}


export default async function ProductPage({ params }: IProductPageProps) {
    
    const product = await prismadb.product.findUnique({
        where: {
            id: params.productId
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm initialData={product} />
            </div>
        </div>
    )
}