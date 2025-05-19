import type { Metadata } from "next"
import { PaperFilters } from "@/components/paper-filters"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Smile } from "lucide-react"
import SearchForm from "@/components/search-form"
import { SearchResults } from "@/components/search-results"

export const metadata: Metadata = {
  title: "Scholar Search | Find Academic Papers",
  description: "Search academic papers with AI-powered semantic search capabilities. No tracking, no cookies.",
  openGraph: {
    title: "Scholar Search | Find Academic Papers",
    description: "Search academic papers with AI-powered semantic search capabilities. No tracking, no cookies.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scholar Search | Find Academic Papers",
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

  // Popular topics from real academic fields
  const popularTopics = [
    { name: "Computer Science", slug: "Computer+Science" },
    { name: "Medicine", slug: "Medicine" },
    { name: "Climate Science", slug: "Environmental+Science" },
    { name: "Neuroscience", slug: "Neuroscience" },
    { name: "Artificial Intelligence", slug: "Artificial+Intelligence" },
  ]

  return (
    <main className="min-h-screen wavy-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">Scholar Search</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            Find academic papers with real-time search. Discover research based on concepts, not just keywords.
          </p>
          <div className="w-full max-w-3xl search-container">
            <SearchForm initialQuery={query || ""} />
          </div>
        </div>

        {hasSearchParams ? (
          <div className="bg-background/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <PaperFilters initialTopic={topic} initialYear={year} />
              </div>
              <div className="md:col-span-3">
                <SearchResults query={query} topic={topic} year={year} />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-12 text-center bg-background/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-sand-200 flex items-center justify-center animate-float">
                <Smile className="h-6 w-6 text-sand-800" />
              </div>
            </div>
            <h2 className="text-2xl font-display font-medium mb-6">Popular Research Fields</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {popularTopics.map((topic) => (
                <Link key={topic.slug} href={`/?topic=${topic.slug}`}>
                  <Button variant="outline" className="rounded-full bg-sand-100 hover:bg-sand-200 border-sand-200">
                    {topic.name}
                  </Button>
                </Link>
              ))}
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
      </div>
    </main>
  )
}
