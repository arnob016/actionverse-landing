import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 Action Tokens, All rights reserved. Empowering positive actions through blockchain technology
          </p>
          <Button variant="link" className="text-white">
            <Link href="/terms">Terms and Conditions</Link>
          </Button>
        </div>
      </div>
    </footer>
  )
}

