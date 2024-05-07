import ProductForm from "@/components/store/products/product-form"
import prismadb from "@/lib/prismadb"

interface IProductPageProps {
    params: {
        productId: string;
        storeId: string;
    };
}


export default async function ProductPage({ params }: IProductPageProps) {
    
    const product = await prismadb.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            images: true
        }
    })

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    })


    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm 
                    initialData={product}
                    categories={categories}
                    colors={colors}
                    sizes={sizes}
                />
            </div>
        </div>
    )
}