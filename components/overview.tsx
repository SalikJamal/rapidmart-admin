"use client"

import { 
    Bar, 
    BarChart, 
    ResponsiveContainer, 
    XAxis, 
    YAxis 
} from "recharts"
import { IGraphData } from "@/lib/types"

interface IOverviewProps {
    data: IGraphData[];
}


export default function Overview({ data }: IOverviewProps) {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={value => `$${value}`}
                    axisLine={false}
                />
                <Bar
                    dataKey="total"
                    fill="#3498DB"
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}