import { Suspense } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink } from "lucide-react"
import { searchPapers } from "@/lib/search"
import Link from "next/link"

interface SearchResultsProps {
  query?: string
  topic?: string
  year?: string
}

export function SearchResults({ query, topic, year }: SearchResultsProps) {
  return (
    <Suspense fallback={<SearchResultsSkeleton />}>
      <SearchResultsContent query={query} topic={topic} year={year} />
    </Suspense>
  )
}

async function SearchResultsContent({ query, topic, year }: SearchResultsProps) {
  // Only search if we have at least one parameter
  if (!query && !topic && !year) {
    return <EmptyState />
  }

  const papers = await searchPapers({ query, topic, year })

  if (papers.length === 0) {
    return <NoResults query={query} topic={topic} year={year} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {papers.length} Results
          {query && <span> for "{query}"</span>}
          {topic && <span> in {topic}</span>}
          {year && <span> from {year}</span>}
        </h2>
      </div>

      <div className="space-y-4">
        {papers.map((paper) => (
          <Card key={paper.id}>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                <Link
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-start gap-1"
                >
                  {paper.title}
                  <ExternalLink className="h-4 w-4 mt-1 flex-shrink-0" />
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {paper.authors.join(", ")} • {paper.year}
              </p>
              <p className="text-sm">{paper.abstract}</p>
            </CardContent>
            <CardFooter>
              <div className="flex flex-wrap gap-2">
                {paper.topics.map((t) => (
                  <Badge key={t} variant="secondary">
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
      <Skeleton className="h-8 w-48" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-full max-w-md" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
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
      <h3 className="text-lg font-medium mb-2">Start your research journey</h3>
      <p className="text-muted-foreground">Enter a search term or select filters to find academic papers</p>
    </div>
  )
}

function NoResults({ query, topic, year }: SearchResultsProps) {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium mb-2">No results found</h3>
      <p className="text-muted-foreground">
        We couldn't find any papers matching your search
        {query && <span> for "{query}"</span>}
        {topic && <span> in {topic}</span>}
        {year && <span> from {year}</span>}
      </p>
    </div>
  )
}
