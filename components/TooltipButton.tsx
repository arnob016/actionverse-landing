"use client"

import { useState, useEffect, type MouseEvent } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TooltipButtonProps extends ButtonProps {
  tooltipText: string
}

const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 70%, 50%)`
}

export function TooltipButton({ children, tooltipText, className, ...props }: TooltipButtonProps) {
  const [buttonColor, setButtonColor] = useState<string>(generateRandomColor())
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setButtonColor(generateRandomColor())

    // Show tooltip on click
    setTooltipOpen(true)

    // Auto-hide tooltip after 2 seconds
    setTimeout(() => setTooltipOpen(false), 2000)
  }

  return (
    <TooltipProvider>
      <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
        <TooltipTrigger asChild>
          <Button
            {...props}
            className={`text-white ${className || ""}`} // Preserve other styles
            onClick={handleClick}
            onMouseEnter={() => setTooltipOpen(true)} // Show on hover
            onMouseLeave={() => setTooltipOpen(false)} // Hide when mouse leaves
            style={{ backgroundColor: buttonColor }}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
