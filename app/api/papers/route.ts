import { NextResponse } from "next/server"
import { sanitizeInput } from "@/lib/utils"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")
    const topic = searchParams.get("topic")
    const year = searchParams.get("year")
    const limit = searchParams.get("limit") || "10"

    // Validate and sanitize inputs
    if (!query && !topic && !year) {
      return NextResponse.json({ error: "At least one search parameter is required" }, { status: 400 })
    }

    let apiUrl = ""

    // Construct the appropriate Semantic Scholar API URL based on parameters
    if (query) {
      const sanitizedQuery = sanitizeInput(query)
      apiUrl = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(
        sanitizedQuery,
      )}&limit=${limit}&fields=paperId,externalIds,url,title,abstract,venue,year,authors,citationCount,influentialCitationCount,isOpenAccess,fieldsOfStudy,s2FieldsOfStudy`
    } else if (topic && topic !== "all") {
      const sanitizedTopic = sanitizeInput(topic)
      apiUrl = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(
        sanitizedTopic,
      )}&limit=${Number.parseInt(limit) * 2}&fields=paperId,externalIds,url,title,abstract,venue,year,authors,citationCount,influentialCitationCount,isOpenAccess,fieldsOfStudy,s2FieldsOfStudy`
    } else if (year && year !== "all") {
      const sanitizedYear = sanitizeInput(year)
      apiUrl = `https://api.semanticscholar.org/graph/v1/paper/search?query=year:${sanitizedYear}&limit=${limit}&fields=paperId,externalIds,url,title,abstract,venue,year,authors,citationCount,influentialCitationCount,isOpenAccess,fieldsOfStudy,s2FieldsOfStudy`
    } else {
      // Fallback to recent papers
      apiUrl = `https://api.semanticscholar.org/graph/v1/paper/search?query=recent research&limit=${limit}&fields=paperId,externalIds,url,title,abstract,venue,year,authors,citationCount,influentialCitationCount,isOpenAccess,fieldsOfStudy,s2FieldsOfStudy`
    }

    // Make the request to Semantic Scholar API
    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.error(`Semantic Scholar API error: ${response.status} ${response.statusText}`)
      return NextResponse.json(
        { error: `Semantic Scholar API error: ${response.status} ${response.statusText}` },
        { status: response.status },
      )
    }

    const data = await response.json()

    // If we're searching by topic, filter the results
    if (topic && topic !== "all") {
      const lowerTopic = sanitizeInput(topic).toLowerCase()

      // Filter papers that have the topic in fieldsOfStudy or s2FieldsOfStudy
      const filteredPapers = data.data
        .filter((paper: any) => {
          // Check in fieldsOfStudy
          if (
            paper.fieldsOfStudy &&
            paper.fieldsOfStudy.some((field: string) => field.toLowerCase().includes(lowerTopic))
          ) {
            return true
          }

          // Check in s2FieldsOfStudy
          if (
            paper.s2FieldsOfStudy &&
            paper.s2FieldsOfStudy.some((field: any) => field.category.toLowerCase().includes(lowerTopic))
          ) {
            return true
          }

          return false
        })
        .slice(0, Number.parseInt(limit))

      data.data = filteredPapers
    }

    // Convert the data to our format
    const papers = data.data.map((paper: any) => ({
      id: paper.paperId,
      title: paper.title,
      abstract: paper.abstract || "No abstract available",
      authors: paper.authors.map((author: any) => author.name),
      year: paper.year?.toString() || "Unknown",
      url: paper.url || `https://www.semanticscholar.org/paper/${paper.paperId}`,
      topics: paper.fieldsOfStudy || paper.s2FieldsOfStudy?.map((field: any) => field.category) || ["General"],
      citationCount: paper.citationCount,
      isOpenAccess: paper.isOpenAccess,
    }))

    return NextResponse.json({ papers })
  } catch (error) {
    console.error("Error in papers API route:", error)
    return NextResponse.json({ error: "Failed to fetch papers" }, { status: 500 })
  }
}
