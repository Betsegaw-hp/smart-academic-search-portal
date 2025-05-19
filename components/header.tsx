import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { BookOpen } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sage-300 text-sage-800">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="font-display font-medium text-lg">Scholar Search</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6">
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="/privacy" className="text-sm font-medium transition-colors hover:text-primary">
              Privacy
            </Link>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
