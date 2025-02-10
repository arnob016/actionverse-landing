"use client";

import { useRef, useEffect } from "react";

interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
}

export function Spotlight({ children, className = "" }: SpotlightProps) {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      
      const { left, top, width, height } = spotlightRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      spotlightRef.current.style.setProperty("--mouse-x", `${x}`);
      spotlightRef.current.style.setProperty("--mouse-y", `${y}`);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={spotlightRef} className={`relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 bg-transparent">
        <div className="absolute inset-0" 
          style={{
            background: `radial-gradient(
              600px circle at 
              calc(var(--mouse-x, 0.5) * 100%) 
              calc(var(--mouse-y, 0.5) * 100%), 
              rgba(50, 205, 50, 0.12), 
              transparent 50%
            )`,
            transition: "background 0.1s ease-out"
          }}
        />
      </div>
      {children}
    </div>
  );
}
