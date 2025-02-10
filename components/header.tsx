import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm duration-500 ease-in-out rounded-b-xl">
      <div className="flex items-center justify-between px-6 py-2">
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
        <nav className="hidden md:flex items-center gap-8">
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
          <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
            Support
          </Link>
        </nav>
        <Button variant="secondary" className="bg-white text-black hover:bg-gray-100">
          Launch WebApp
        </Button>
      </div>
    </header>
  )
}

