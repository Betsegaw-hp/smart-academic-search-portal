"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, BookOpen, Loader2, Award, Lock, Unlock, AlertTriangle } from "lucide-react"
import { searchPapers } from "@/lib/search"
import { searchDuckDuckGo } from "@/lib/duckduckgo"
import type { Paper } from "@/lib/semantic-scholar"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface SearchResultsProps {
  query?: string
  topic?: string
  year?: string
}

export function SearchResults({ query, topic, year }: SearchResultsProps) {
  const [papers, setPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [useDuckDuckGo, setUseDuckDuckGo] = useState(false)
  const [searchSource, setSearchSource] = useState<string>("Semantic Scholar")

  useEffect(() => {
    async function fetchResults() {
      // Only search if we have at least one parameter
      if (!query && !topic && !year) {
        setPapers([])
        return
      }

      setLoading(true)
      setError(null)

      try {
        // If DuckDuckGo is enabled and we have a query, use it
        if (useDuckDuckGo && query) {
          const results = await searchDuckDuckGo(query)
          setPapers(results)
          setSearchSource("DuckDuckGo")
        } else {
          // Otherwise use Semantic Scholar
          const results = await searchPapers({ query, topic, year })
          setPapers(results)
          setSearchSource("Semantic Scholar")
        }
      } catch (error) {
        console.error("Search error:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch search results. Please try again later.")
        setPapers([])
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query, topic, year, useDuckDuckGo])

  if (loading) {
    return <SearchResultsSkeleton />
  }

  if (error) {
    return <ErrorState error={error} />
  }

  if (!query && !topic && !year) {
    return <EmptyState />
  }

  if (papers.length === 0) {
    return <NoResults query={query} topic={topic} year={year} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl font-display font-medium">
          {papers.length} Results
          {query && <span> for "{query}"</span>}
          {topic && topic !== "all" && <span> in {topic}</span>}
          {year && year !== "all" && <span> from {year}</span>}
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-sm px-3 py-1 rounded-full bg-sage-100 text-sage-700">{searchSource}</div>
          <div className="flex items-center space-x-2">
            <Switch
              id="use-ddg"
              checked={useDuckDuckGo}
              onCheckedChange={setUseDuckDuckGo}
              className="data-[state=checked]:bg-sage-500"
            />
            <Label htmlFor="use-ddg" className="text-sm">
              Use DuckDuckGo
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {papers.map((paper) => (
          <Card
            key={paper.id}
            className="paper-card border-2 border-sage-200 bg-background/90 backdrop-blur-sm rounded-3xl overflow-hidden"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium font-display">
                <Link
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-start gap-2"
                >
                  <BookOpen className="h-5 w-5 mt-1 flex-shrink-0 text-sage-600" />
                  <span>{paper.title}</span>
                  <ExternalLink className="h-4 w-4 mt-1 flex-shrink-0 ml-auto" />
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-3">
                {paper.isOpenAccess !== undefined && (
                  <Badge
                    variant="outline"
                    className={`rounded-full ${paper.isOpenAccess ? "bg-green-100 text-green-800 border-green-200" : "bg-amber-100 text-amber-800 border-amber-200"}`}
                  >
                    {paper.isOpenAccess ? (
                      <>
                        <Unlock className="h-3 w-3 mr-1" /> Open Access
                      </>
                    ) : (
                      <>
                        <Lock className="h-3 w-3 mr-1" /> Subscription
                      </>
                    )}
                  </Badge>
                )}
                {paper.citationCount !== undefined && paper.citationCount > 0 && (
                  <Badge variant="outline" className="rounded-full bg-blue-100 text-blue-800 border-blue-200">
                    <Award className="h-3 w-3 mr-1" /> {paper.citationCount} Citations
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {paper.authors.join(", ")} • {paper.year}
              </p>
              <p className="text-sm">{paper.abstract}</p>
            </CardContent>
            <CardFooter>
              <div className="flex flex-wrap gap-2">
                {paper.topics &&
                  paper.topics.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="topic-badge bg-sand-100 hover:bg-sand-200 text-sand-800 border-sand-200 rounded-full"
                    >
                      {t}
                    </Badge>
                  ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-sage-600" />
          <span className="text-lg font-display">Searching for papers...</span>
        </div>
        <Skeleton className="h-6 w-32 rounded-full" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card
            key={i}
            className="border-2 border-sage-200 bg-background/90 backdrop-blur-sm rounded-3xl overflow-hidden"
          >
            <CardHeader>
              <Skeleton className="h-6 w-full max-w-md" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-32 rounded-full" />
              </div>
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium mb-2 font-display">Start your research journey</h3>
      <p className="text-muted-foreground">Enter a search term or select filters to find academic papers</p>
    </div>
  )
}

function NoResults({ query, topic, year }: SearchResultsProps) {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium mb-2 font-display">No results found</h3>
      <p className="text-muted-foreground">
        We couldn't find any papers matching your search
        {query && <span> for "{query}"</span>}
        {topic && topic !== "all" && <span> in {topic}</span>}
        {year && year !== "all" && <span> from {year}</span>}
      </p>
    </div>
  )
}

function ErrorState({ error }: { error: string }) {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
      </div>
      <h3 className="text-lg font-medium mb-2 font-display text-red-600">Error</h3>
      <p className="text-muted-foreground mb-4">{error}</p>
      <Button onClick={() => window.location.reload()} className="rounded-xl">
        Try Again
      </Button>
    </div>
  )
}
