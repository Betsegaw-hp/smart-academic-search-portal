import { NextResponse } from "next/server"
import { sanitizeInput } from "@/lib/utils"
import type { Paper } from "@/lib/semantic-scholar"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")

    if (!query) {
      return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
    }

    const sanitizedQuery = sanitizeInput(query)

    // In a real implementation, you would scrape DuckDuckGo search results
    // For demonstration, we'll simulate results based on the query
    // Note: Web scraping may violate terms of service, so in a production app,
    // you should use official APIs or get permission

    // Simulate a network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate some realistic-looking results based on the query
    const results: Paper[] = [
      {
        id: `ddg-1-${Date.now()}`,
        title: `${sanitizedQuery} - Recent Research and Findings`,
        abstract: `This paper explores the latest developments in ${sanitizedQuery} with a focus on practical applications and theoretical frameworks.`,
        authors: ["A. Researcher", "B. Academic"],
        year: new Date().getFullYear().toString(),
        url: `https://arxiv.org/search/?query=${encodeURIComponent(sanitizedQuery)}&searchtype=all`,
        topics: [sanitizedQuery.split(" ")[0], "Research", "Academic"],
        isOpenAccess: true,
      },
      {
        id: `ddg-2-${Date.now()}`,
        title: `A Comprehensive Review of ${sanitizedQuery}`,
        abstract: `This review paper summarizes the current state of knowledge regarding ${sanitizedQuery} and identifies gaps for future research.`,
        authors: ["C. Scholar", "D. Professor"],
        year: (new Date().getFullYear() - 1).toString(),
        url: `https://scholar.google.com/scholar?q=${encodeURIComponent(sanitizedQuery)}`,
        topics: ["Review", "Meta-analysis", sanitizedQuery.split(" ")[0]],
        citationCount: 42,
        isOpenAccess: false,
      },
    ]

    return NextResponse.json({ results })
  } catch (error) {
    console.error("DuckDuckGo API route error:", error)
    return NextResponse.json({ error: "Failed to search DuckDuckGo" }, { status: 500 })
  }
}
