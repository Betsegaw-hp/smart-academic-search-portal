import { NextResponse } from "next/server"
import { searchPapers } from "@/lib/search"
import { sanitizeInput } from "@/lib/utils"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Get and sanitize search parameters
    const query = searchParams.get("query") ? sanitizeInput(searchParams.get("query") || "") : undefined
    const topic = searchParams.get("topic") ? sanitizeInput(searchParams.get("topic") || "") : undefined
    const year = searchParams.get("year") ? sanitizeInput(searchParams.get("year") || "") : undefined

    // Perform search
    const papers = await searchPapers({ query, topic, year })

    // Return results
    return NextResponse.json({ papers })
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json({ error: "Failed to perform search" }, { status: 500 })
  }
}
