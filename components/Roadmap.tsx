'use client'

import { useState } from 'react'
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TooltipButton } from "@/components/TooltipButton"
import { CalendarDays, Users, TrendingUp } from 'lucide-react'
import { MagicCard } from "./ui/magic-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { storage } from '@/lib/firebase'
import { ref, uploadString } from 'firebase/storage'
import { toast } from '@/hooks/use-toast'

const roadmapData = [
    {
        season: 'Spring 2025',
        icon: CalendarDays,
        items: [
            'Hunt for digital rewards in augmented reality',
            'Buy and sell digital rewards and other goods',
            'Redeem token-gate, geo-fenced, and time-sensitive rewards',
            'Complete tasks for bounties'
        ]
    },
    {
        season: 'Fall 2025',
        icon: Users,
        items: [
            'Community governance focused organization adoption and philanthropy',
            'Action Metaverse',
            'Social enhancements',
            'Improved offer and redemption UX',
            'Automated philanthropy tax on transactions'
        ]
    },
]

export default function Roadmap() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        location: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const signupData = JSON.stringify({
                ...formData,
                timestamp: new Date().toISOString()
            })

            const fileName = `alphaSignups/${formData.email}-${Date.now()}.json`
            const storageRef = ref(storage, fileName)

            await uploadString(storageRef, signupData, 'raw', {
                contentType: 'application/json',
            })

            toast({
                title: "Success!",
                description: "You've been signed up for the alpha release.",
                variant: "default",
                duration: 5000,
            })

            // Reset form after submission
            setFormData({ name: '', email: '', location: '' })
        } catch (error) {
            console.error('Error submitting form:', error)
            toast({
                title: "Error",
                description: "There was a problem signing you up. Please try again.",
                variant: "destructive",
                duration: 5000,
            })
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <section id="roadmap" className="py-16 ">
            <div className="max-w-6xl mx-auto ">
                <h2 className="text-4xl font-bold mb-12 text-center">Actionverse Roadmap</h2>
                <div className="flex flex-wrap gap-8 md:grid md:grid-cols-2  w-full">

                    <MagicCard className="  lg:max-w-[60rem] xl:max-w-[70rem] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 col-span-2 lg:col-span-3">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <Badge variant="outline" className="text-lg font-semibold px-3 py-1">
                                    Winter 2025
                                </Badge>
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-primary" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8 ">
                                <div>
                                    <h3 className="text-2xl font-semibold mb-4">Limited Alpha Release</h3>
                                    <p className="text-muted-foreground mb-4">Be among the first to experience Actionverse. Sign up for our exclusive alpha release and shape the future of digital rewards.</p>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="inline-block w-2 h-2 mt-2 mr-3 bg-primary  rounded-xl" />
                                            <span className="text-sm">Early access to all features</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block w-2 h-2 mt-2 mr-3 bg-primary rounded-xl" />
                                            <span className="text-sm">Provide valuable feedback</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="inline-block w-2 h-2 mt-2 mr-3 bg-primary rounded-xl" />
                                            <span className="text-sm">Exclusive alpha tester rewards</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 rounded-xl"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 rounded-xl"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="location">Location</Label>
                                            <Input
                                                id="location"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1 rounded-xl"
                                            />
                                        </div>
                                        <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
                                            {isSubmitting ? 'Signing Up...' : 'Sign Up for Alpha'}
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </CardContent>
                    </MagicCard>

                    {roadmapData.map((season, index) => (
                        <MagicCard key={index} className=" w-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                            <CardContent className="p-6 min-h-[350px] max-h-[350px]  md:min-h-[300px] md:max-h-[300px]">
                                <div className="flex items-center justify-between mb-6" >
                                    <Badge variant="outline" className="text-lg font-semibold px-3 py-1">
                                        {season.season}
                                    </Badge>
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <season.icon className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <ul className="space-y-4 ">
                                    {season.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-start group">
                                            <span className="inline-block w-2 h-2 mt-2 mr-3 bg-primary rounded-full group-hover:scale-125 transition-transform duration-300" />
                                            <span className="text-sm w-full leading-tight group-hover:text-primary transition-colors duration-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </MagicCard>
                    ))}
                </div>
            </div>
        </section>
    )
}

