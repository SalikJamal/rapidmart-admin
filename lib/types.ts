
export interface IReactChildren {
    children: React.ReactNode;
}


export interface IBillboardColumn {
    id: string;
    label: string;
    createdAt: string;
}


export interface ICategoryColumn {
    id: string;
    name: string;
    billboardLabel: string;
    createdAt: string;
}


export interface ISizeColumn {
    id: string;
    name: string;
    value: string;
    createdAt: string;
}

export interface IColorColum extends ISizeColumn {}


export interface IProductColumn {
    id: string;
    name: string;
    price: string;
    isFeatured: boolean;
    isArchived: boolean;
    category: string;
    size: string;
    color: string;
    createdAt: string;
}


export interface IOrderColumn {
    id: string;
    phone: string;
    address: string;
    isPaid: boolean;
    products: string;
    totalPrice: string;
    createdAt: string;
}


export interface IGraphData {
    name: string;
    total: number;
}