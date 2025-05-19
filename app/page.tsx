import type { Metadata } from "next"
import SearchForm from "@/components/search-form"
import { SearchResults } from "@/components/search-results"
import { PaperFilters } from "@/components/paper-filters"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Academic Papers Search | Secure & Smart Search Portal",
  description: "Search academic papers with AI-powered semantic search capabilities. No tracking, no cookies.",
  openGraph: {
    title: "Academic Papers Search | Secure & Smart Search Portal",
    description: "Search academic papers with AI-powered semantic search capabilities. No tracking, no cookies.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Academic Papers Search | Secure & Smart Search Portal",
    description: "Search academic papers with AI-powered semantic search capabilities. No tracking, no cookies.",
  },
}

export default function Home({
  searchParams,
}: {
  searchParams: { query?: string; topic?: string; year?: string }
}) {
  const { query, topic, year } = searchParams
  const hasSearchParams = !!query || !!topic || !!year

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Academic Papers Search</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          Search through thousands of academic papers with AI-powered semantic search. Find relevant research based on
          concepts, not just keywords.
        </p>
        <div className="w-full max-w-3xl">
          <SearchForm initialQuery={query || ""} />
        </div>
      </div>

      {hasSearchParams && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <PaperFilters initialTopic={topic} initialYear={year} />
          </div>
          <div className="md:col-span-3">
            <SearchResults query={query} topic={topic} year={year} />
          </div>
        </div>
      )}

      {!hasSearchParams && (
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-6">Popular Topics</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/?topic=Machine+Learning">
              <Button variant="outline">Machine Learning</Button>
            </Link>
            <Link href="/?topic=Climate+Science">
              <Button variant="outline">Climate Science</Button>
            </Link>
            <Link href="/?topic=Quantum+Computing">
              <Button variant="outline">Quantum Computing</Button>
            </Link>
            <Link href="/?topic=Neuroscience">
              <Button variant="outline">Neuroscience</Button>
            </Link>
            <Link href="/?topic=Renewable+Energy">
              <Button variant="outline">Renewable Energy</Button>
            </Link>
          </div>
        </div>
      )}

      <footer className="mt-24 text-center text-sm text-muted-foreground">
        <p>Privacy-first academic search. No tracking, no cookies. All searches are anonymous.</p>
        <div className="mt-2">
          <Link href="/about" className="underline hover:text-primary">
            About
          </Link>
          {" • "}
          <Link href="/privacy" className="underline hover:text-primary">
            Privacy
          </Link>
        </div>
      </footer>
    </main>
  )
}
