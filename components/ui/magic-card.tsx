'use client'

import * as React from 'react'
import { Card } from "@/components/ui/card"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    className?: string
}

interface MagicCardProps extends CardProps {
    children: React.ReactNode
    className?: string
    contentClassName?: string
}

const MagicCard = React.forwardRef<HTMLDivElement, MagicCardProps>(
    ({ children, className, contentClassName, ...props }, ref) => {
        return (
            <Card
                ref={ref}
                className={`relative overflow-hidden rounded-xl p-[2px] transition-all hover:shadow-2xl hover:-translate-y-2 ${className}`}
                {...props}
            >
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] " />
                <div className={`relative rounded-xl bg-card  text-card-foreground ${contentClassName}`}>
                    {children}
                </div>
            </Card>
        )
    }
)
MagicCard.displayName = "MagicCard"

export { MagicCard }
