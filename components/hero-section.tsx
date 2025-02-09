"use client"

import { Button } from "@/components/ui/button"
import { ShineBorder } from "@/components/ui/shine-border"
import { Spotlight } from "@/components/ui/spotlight"
import { Play, Pause } from "lucide-react"
import Image from "next/image"
import { useState, useRef } from "react"

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <Spotlight className="relative pt-28 pb-8
     overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Empowering Positive Actions
            <br />
            Through Blockchain Technology
          </h1>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" className="gap-2 rounded-xl border-white/10 bg-white/5 hover:bg-white/10">
              Launch WebApp
            </Button>
            <Button variant="secondary" className="bg-white rounded-xl text-black hover:bg-gray-100 flex items-center gap-2">
              <Image src="/google-play-logo.svg" alt="Google Play" width={20} height={20} />
              Google Play
            </Button>
            <Button variant="secondary" className="bg-white rounded-xl text-black hover:bg-gray-100 flex items-center gap-2">
              <Image src="/app-store-logo.svg" alt="App Store" width={20} height={20} />
              App Store
            </Button>
          </div>
        </div>

        <ShineBorder className="relative mx-auto" borderClassName="border border-white/10 rounded-xl overflow-hidden">
          <div className="relative aspect-video">
            <video
              ref={videoRef}
              src="ActionverseMap.webm"
              className="w-full h-full object-cover rounded-xl"
              playsInline
              autoPlay
              muted
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
        </ShineBorder>
      </div>
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About ACTION Tokens</h2>
          <p className="text-gray-400 mb-8">ACTION tokens encourage consumers to take positive actions in the physical world. Connect with brands,
          philanthropies, and organizations in the ACTIONVerse.</p>
          <p className="text-gray-400 mb-8">
            ACTION tokens and associated applications exist to encourage consumers taking positive actions in the
            physical world. The tokens are demanded by brands, philanthropies, and organizations motivating and
            marketing these actions within the ACTIONVerse application. They need tokens to provide incentives as well
            as pay application fees.
          </p>
          <p className="text-gray-400">
            The ACTIONVerse will empower the connection of organizations to individuals through physical actions.
            Proprietary augmented reality and token-gated technology enables incredibly unique use cases. Users will be
            enabled to collect various digital goods by physically traveling and searching locations as well as
            completing tasks. They can then redeem these collectibles for unique digital and physically (some
            geographically bound) rewards.
          </p>
        </div>
      </section>
    </Spotlight>
  )
}

