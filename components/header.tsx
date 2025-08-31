"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap, ArrowRight, Sparkles, Rocket } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-2xl border-b border-white/5">
      <div className="flex items-center justify-between px-6 py-4 relative">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/placeholder.png?height=32&width=32"
                alt="Action Tokens"
                width={32}
                height={32}
                className="w-8 h-8 rounded-lg transition-transform group-hover:scale-110 duration-300"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-medium text-white">Action Tokens</span>
          </Link>
        </div>

        <div className="md:hidden z-20">
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="ghost"
            className="hover:bg-white/10 transition-all duration-300 text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        <div className={`
          ${isMenuOpen ? 'flex' : 'hidden'} 
          md:flex flex-col md:flex-row items-center gap-8 
          fixed md:static left-0 right-0 top-[80px] md:top-0
          bg-black/95 md:bg-transparent backdrop-blur-2xl md:backdrop-blur-none
          p-6 md:p-0
          border-t border-white/10 md:border-0
        `}>
          <nav className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full md:w-auto">
            <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="https://collections.action-tokens.com/"
              className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 relative group"
            >
              Communities
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="https://gallery.action-tokens.com/"
              className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 relative group"
            >
              DAO
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="https://www.map.action-tokens.com/"
              className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 relative group"
            >
              Map
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/roadmap" className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 relative group">
              Roadmap
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="mailto:support@action-tokens.com?subject=I%20need%20support%20with%20an%20Action%20Tokens%20Product"
              className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 relative group"
            >
              Support
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>

          {/* Unique Launch Button */}
          <div className="relative group mt-4 md:mt-0">
            {/* Animated background glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition-all duration-300 animate-pulse" />

            {/* Main button */}
            <Button
              className="relative bg-black hover:bg-black text-white font-semibold px-6 py-3 rounded-xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl border-0 overflow-hidden"
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
        </div>
      </div >
    </header >
  )
}