import { sanitizeInput } from "./utils"
import type { Paper } from "./semantic-scholar"

export async function searchDuckDuckGo(query: string): Promise<Paper[]> {
  try {
    const sanitizedQuery = sanitizeInput(query)

    // Use our API route instead of directly calling DuckDuckGo
    const response = await fetch(`/api/duckduckgo?query=${encodeURIComponent(sanitizedQuery)}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `API request failed with status ${response.status}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error searching DuckDuckGo:", error)
    throw error
  }
}
