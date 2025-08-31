"use client"

import { useState } from 'react'

import { ChevronDown, ChevronUp } from 'lucide-react'

export default function HeroWithCollapsible() {
    const [isOpen, setIsOpen] = useState(false)

    return (

        <div className="container mx-auto px-4">
            <section className="text-center py-20">
                <h1 className="text-5xl font-bold mb-4 ">Action Tokens</h1>
                <p
                    onClick={() => setIsOpen(!isOpen)} className="text-xl mb-8 text-muted-foreground flex items-center justify-center underline underline-offset-[6px]">Empowering positive actions in the physical world through blockchain technology

                    {isOpen ? <ChevronUp

                        className="h-4 w-4 ml-2" /> : <ChevronDown


                        className="h-4 w-4 ml-2" />}

                </p>
                {
                    isOpen && <div className="rounded-md border px-4 py-3 font-mono text-sm shadow-sm">
                        <p className="mb-4">
                            ACTION tokens and associated applications exist to encourage consumers taking positive actions in the physical world. The tokens are demanded by organizations, philanthropies, and organizations motivating and marketing these actions within the Actionverse application. They need tokens to provide incentives as well as pay application fees. Tokens are initially supplied by the ACTION tokens project but eventually the majority of supply will come from individuals redeeming their ACTION tokens for various types of rewards.
                        </p>
                        <p className="mb-4">
                            To execute on this vision ACTION tokens project will support the development of the Actionverse as well as organizations that utilize the Actionverse. Underlying the Actionverse is technology that will be monetized and sold to other application creators. However, this technology WILL ALWAYS be provided free of charge to the Actionverse development team.
                        </p>
                        <p>
                            The Actionverse will empower the connection of organizations to individuals through physical actions. Proprietary augmented reality and token-gated technology enables incredibly unique use cases. Users will be enabled to collect various digital goods by physically traveling and searching locations as well as completing tasks. They can then redeem these collectibles for unique digital and physically (some geographically bound) rewards.
                        </p>
                    </div>
                }
                {/* <Button size="lg">Learn More</Button> */}
            </section>




        </div>
    )
}

