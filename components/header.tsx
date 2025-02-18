"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TooltipButton } from "./TooltipButton"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl duration-500 ease-in-out rounded-b-xl">
      <div className="flex items-center justify-between px-6 py-2 relative">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/placeholder.png?height=32&width=32"
              alt="Action Tokens"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="font-medium text-white">Action Tokens</span>
          </Link>
        </div>
        
        <div className="md:hidden z-20">
          <Button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            variant="ghost" 
            className="hover:bg-white/10"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        <div className={`
          ${isMenuOpen ? 'flex' : 'hidden'} 
          md:flex flex-col md:flex-row items-center gap-6 
          fixed md:static left-0 right-0 top-[72px] md:top-0
          bg-black/90 md:bg-transparent backdrop-blur-3xl md:backdrop-blur-none
          p-6 md:p-0
          border-t border-white/10 md:border-0
        `}>
          <nav className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full md:w-auto">
            <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link
              href="https://collections.action-tokens.com/"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Communities
            </Link>
            <Link
              href="https://gallery.action-tokens.com/"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              DAO
            </Link>
            <Link
              href="https://www.map.action-tokens.com/"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Map
            </Link>
            <Link href="/roadmap" className="text-sm text-gray-300 hover:text-white transition-colors">
              Roadmap
            </Link>
            <Link
              href="mailto:support@action-tokens.com?subject=I%20need%20support%20with%20an%20Action%20Tokens%20Product"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Support
            </Link>
          </nav>
          
          <TooltipButton
            variant="outline"
            className="gap-2 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 w-full md:w-auto"
            tooltipText="Coming Soon"
          >
            Launch WebApp
          </TooltipButton>
        </div>
      </div>
    </header>
  )
}
