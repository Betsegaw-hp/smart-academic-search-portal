"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const popularSearches = [
  "machine learning techniques",
  "climate change effects",
  "quantum computing applications",
  "neural networks",
  "renewable energy solutions",
]

export default function SearchForm({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Sanitize input - basic sanitization for demonstration
    const sanitizedQuery = query.trim().replace(/[<>]/g, "")

    if (sanitizedQuery) {
      router.push(`/?query=${encodeURIComponent(sanitizedQuery)}`)
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    router.push(`/?query=${encodeURIComponent(suggestion)}`)
    setShowSuggestions(false)
  }

  const clearSearch = () => {
    setQuery("")
    inputRef.current?.focus()
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative flex items-center">
          <div className="absolute left-4 flex items-center justify-center w-8 h-8 rounded-full bg-sage-100">
            <Search className="h-4 w-4 text-sage-600" />
          </div>
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search for papers, topics, or concepts..."
            className="pl-14 pr-12 py-6 text-base rounded-full border-2 border-sage-200 focus:border-sage-300 bg-background/90 backdrop-blur-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            aria-label="Search papers"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-20 p-1 rounded-full hover:bg-sage-100"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
          <Button type="submit" className="absolute right-1 top-1 bottom-1 rounded-full px-6" disabled={!query.trim()}>
            Search
          </Button>
        </div>
      </form>

      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-sm border-2 border-sage-200 rounded-3xl p-4 shadow-lg search-suggestions z-50"
        >
          <div className="space-y-2">
            {popularSearches.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left p-2 hover:bg-sage-100 rounded-xl transition-colors flex items-center gap-2"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
