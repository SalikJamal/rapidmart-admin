import { auth } from "@clerk/nextjs/server"
import { format } from "date-fns"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"
import OrderClient from "@/components/store/orders/client"
import { IOrderColumn } from "@/lib/types"
import { formatter } from "@/lib/utils"


interface IOrdersPageProps {
    params: {
        storeId: string;
    };
}


export default async function OrdersPage({ params }: IOrdersPageProps) {
    
    const { userId } = auth()
    if(!userId) redirect("/sign-in")
    
    const orders = await prismadb.order.findMany({ 
        where: { 
            storeId: params.storeId 
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedOrders: IOrderColumn[] = orders.map(order => ({
        id: order.id,
        phone: order.phone,
        address: order.address,
        isPaid: order.isPaid,
        products: order.orderItems.map(item => item.product.name).join(", "),
        totalPrice: formatter.format(order.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        createdAt: format(order.createdAt, "MMMM do, yyyy")
    }))
    
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    )
}