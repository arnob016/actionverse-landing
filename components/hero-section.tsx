"use client"

import { Button } from "@/components/ui/button"
import { ShineBorder } from "@/components/ui/shine-border"
import { Spotlight } from "@/components/ui/spotlight"
import { Play, Pause, Rocket, Sparkles } from "lucide-react"
import { TooltipButton } from "@/components/TooltipButton"
import Image from "next/image"
import { useState, useRef } from "react"

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (!isPlaying) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <Spotlight className="relative pt-28 pb-8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Empowering Positive Actions
            <br />
            Through Blockchain Technology
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative group mt-4 md:mt-0">
              {/* Animated background glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition-all duration-300 animate-pulse" />

              {/* Main button */}
              <Button

                className="relative bg-black hover:bg-black text-white font-semibold rounded-xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl border-0 overflow-hidden"
                onClick={() => window.open("https://app.action-tokens.com", "_blank")}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                {/* Button content */}
                <div className="relative flex items-center gap-2">
                  <Rocket className="h-4 w-4 transition-transform group-hover:rotate-12 group-hover:scale-110" />
                  <span className="hidden sm:inline">Launch WebApp</span>
                  <span className="sm:hidden">Launch</span>
                  <Sparkles className="h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="absolute top-2 right-3 w-0.5 h-0.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="absolute bottom-2 left-4 w-0.5 h-0.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  <div className="absolute bottom-1 right-2 w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.6s' }} />
                </div>
              </Button>

            </div>
            <TooltipButton
              variant="outline"
              className="gap-2 rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
              tooltipText="Coming Soon"
            >
              <Image src="/google-play-logo.svg" alt="Google Play" width={20} height={20} />
              Google Play
            </TooltipButton>
            <TooltipButton
              variant="outline"
              className="gap-2 rounded-xl border-white/10 bg-white/5 hover:bg-white/10"
              tooltipText="Coming Soon"
            >
              <Image src="/app-store-logo.svg" alt="App Store" width={20} height={20} />
              App Store
            </TooltipButton>
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
              loop
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
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">About ACTION Tokens</h2>
          <p className="text-gray-400 mb-8">ACTION tokens encourage consumers to take positive actions in the physical world. Connect with organizations,
            philanthropies, and brands in the Actionverse.</p>
          <p className="text-gray-400 mb-8">
            ACTION tokens and associated applications exist to encourage consumers taking positive actions in the
            physical world. The tokens are demanded by brands, philanthropies, and organizations motivating and
            marketing these actions within the Actionverse application. They need tokens to provide incentives as well
            as pay application fees.
          </p>
          <p className="text-gray-400">
            The Actionverse will empower the connection of organizations to individuals through physical actions.
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