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