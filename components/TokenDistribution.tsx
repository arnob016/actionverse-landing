"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"


import { AreaChart, Area, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Badge } from "./ui/badge"

const data = [
    { name: 'Development & Governance', value: 50, color: 'hsl(221.2, 83.2%, 53.3%)' },
    { name: 'Brand Support', value: 20, color: 'hsl(262, 83%, 58%)' },
    { name: 'Community Distribution', value: 20, color: 'hsl(199, 89%, 48%)' },
    { name: 'Philanthropy', value: 10, color: 'hsl(346, 87%, 48%)' },
]

const areaChartData = [
    { name: '2025 Q1', Development: 40, Brand: 15, Community: 15, Philanthropy: 5 },
    { name: '2025 Q2', Development: 45, Brand: 18, Community: 18, Philanthropy: 7 },
    { name: '2025 Q3', Development: 48, Brand: 20, Community: 20, Philanthropy: 9 },
    { name: '2025 Q4', Development: 50, Brand: 20, Community: 20, Philanthropy: 10 },
]


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: {
    cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
export default function TokenDistribution() {

    return (
        <section id="distribution" className="py-16">
            <h2 className={`text-3xl font-bold mb-8 text-center`}>Action Token Distribution</h2>
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Token Allocation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart >
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        label={renderCustomizedLabel}
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Token Distribution Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={areaChartData}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <Area type="monotone" dataKey="Development" stackId="1" stroke={data[0].color} fill={data[0].color} />
                                    <Area type="monotone" dataKey="Brand" stackId="1" stroke={data[1].color} fill={data[1].color} />
                                    <Area type="monotone" dataKey="Community" stackId="1" stroke={data[2].color} fill={data[2].color} />
                                    <Area type="monotone" dataKey="Philanthropy" stackId="1" stroke={data[3].color} fill={data[3].color} />
                                    <Tooltip />
                                    <Legend />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card className="mt-8">
                <CardContent>
                    <h3 className="text-xl font-semibold mb-4">Track our expenditures:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            Actionverse Development:
                            <a
                                href="https://stellar.expert/explorer/public/account/GA6RBPN6EQXFYSRRPDVAFAH576A33YF7YPHTR6KVLPC7QZBU6VUL3C2N"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Badge variant='secondary'>GA6RBPN6EQXFYSRRPDVAFAH576A33YF7YPHTR6KVLPC7QZBU6VUL3C2N</Badge>
                            </a>
                        </li>
                        <li>
                            Actionverse Community:
                            <a
                                href="https://stellar.expert/explorer/public/account/GAQSJVWTG4HVG6QGE6PKIEXBYA6Y4U2EP2ETTPTILXPSMTOZBTQBTAYY"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Badge variant='secondary'>GAQSJVWTG4HVG6QGE6PKIEXBYA6Y4U2EP2ETTPTILXPSMTOZBTQBTAYY</Badge>
                            </a>
                        </li>
                        <li>
                            Ecosystem Grants:
                            <a
                                href="https://stellar.expert/explorer/public/account/GBNWMRYLYRPZ3L5UX6OIKEIHVK565IAPPFB3YIBMCNUUU4T56R2K23H4"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Badge>GBNWMRYLYRPZ3L5UX6OIKEIHVK565IAPPFB3YIBMCNUUU4T56R2K23H4</Badge>
                            </a>
                        </li>
                        <li>
                            Philanthropy:
                            <a
                                href="https://stellar.expert/explorer/public/account/GBKHFR3GU7VSKJEX4DSCIEMFZDANK6HGC5FMVBXDAZIYHHNC555WAARK"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Badge>GBKHFR3GU7VSKJEX4DSCIEMFZDANK6HGC5FMVBXDAZIYHHNC555WAARK</Badge>
                            </a>
                        </li>
                    </ul>

                </CardContent>
            </Card>
        </section>
    )
}

