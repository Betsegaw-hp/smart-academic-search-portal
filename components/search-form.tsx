"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchForm({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Sanitize input - basic sanitization for demonstration
    const sanitizedQuery = query.trim().replace(/[<>]/g, "")

    if (sanitizedQuery) {
      router.push(`/?query=${encodeURIComponent(sanitizedQuery)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for papers, topics, or concepts..."
          className="pl-10 pr-20 py-6 text-base"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search papers"
        />
        <Button type="submit" className="absolute right-1 top-1 bottom-1" disabled={!query.trim()}>
          Search
        </Button>
      </div>
    </form>
  )
}
