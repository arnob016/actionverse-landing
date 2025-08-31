'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Coins, Users, Building, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const summaryItems = [
    {
        icon: Coins,
        title: "Action Tokens",
        description: "Incentivize positive actions in the physical world through blockchain technology."
    },
    {
        icon: Users,
        title: "Community Driven",
        description: "Empower individuals to redeem tokens for unique digital and physical rewards."
    },
    {
        icon: Building,
        title: "Organization Integration",
        description: "Connect organizations with individuals through innovative physical actions and tasks."
    },
    {
        icon: Sparkles,
        title: "Actionverse",
        description: "Utilize augmented reality and token-gated technology for unique use cases."
    }
]

export default function ExecutiveSummary() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <section id="summary" className="py-16 px-4">
            <h2 className="text-4xl font-bold mb-12 text-center ">Core Values</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
                {summaryItems.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card
                            className="overflow-hidden transition-all rounded-xl duration-300 hover:shadow-xl hover:-translate-y-2 group"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <CardContent className="p-6 h-full flex flex-col">
                                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                                    <item.icon className={`w-8 h-8 text-primary transition-all duration-300 ${hoveredIndex === index ? 'scale-110' : ''}`} />
                                </div>
                                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                                <p className="text-sm text-muted-foreground flex-grow">{item.description}</p>
                                <div className="mt-4 h-1 w-0 group-hover:w-full bg-primary transition-all duration-300 rounded-full" />
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

