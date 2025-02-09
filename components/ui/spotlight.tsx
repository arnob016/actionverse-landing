"use client"

import { useRef, type MouseEvent, type ReactNode } from "react"

interface SpotlightProps {
  children: ReactNode
  className?: string
}

export function Spotlight({ children, className = "" }: SpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const { left, top, width, height } = divRef.current.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    divRef.current.style.setProperty("--mouse-x", `${x}`)
    divRef.current.style.setProperty("--mouse-y", `${y}`)
  }

  return (
    <div ref={divRef} onMouseMove={handleMouseMove} className={`relative overflow-hidden min-h-screen ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(
            800px circle at 
            calc(var(--mouse-x, 0.5) * 100%) 
            calc(var(--mouse-y, 0.5) * 100%), 
            rgba(255, 255, 255, 0.1), 
            transparent 40%
          )`,
        }}
      />
      {children}
    </div>
  )
}

