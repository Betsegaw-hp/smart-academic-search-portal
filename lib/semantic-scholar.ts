import { sanitizeInput } from "./utils"

export interface SemanticScholarPaper {
  paperId: string
  externalIds?: {
    DOI?: string
    ArXiv?: string
    MAG?: string
    ACL?: string
    PubMed?: string
    PubMedCentral?: string
  }
  url?: string
  title: string
  abstract?: string
  venue?: string
  year?: number
  authors: {
    authorId: string
    name: string
  }[]
  citationCount?: number
  influentialCitationCount?: number
  isOpenAccess?: boolean
  fieldsOfStudy?: string[]
  s2FieldsOfStudy?: {
    category: string
    source: string
  }[]
}

export interface SemanticScholarResponse {
  total: number
  offset: number
  next: number
  data: SemanticScholarPaper[]
}

export interface Paper {
  id: string
  title: string
  abstract: string
  authors: string[]
  year: string
  url: string
  topics: string[]
  citationCount?: number
  isOpenAccess?: boolean
}

export async function searchSemanticScholar(query: string, limit = 10): Promise<Paper[]> {
  try {
    const sanitizedQuery = sanitizeInput(query)

    // Use our API route instead of directly calling Semantic Scholar
    const response = await fetch(`/api/papers?query=${encodeURIComponent(sanitizedQuery)}&limit=${limit}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `API request failed with status ${response.status}`)
    }

    const data = await response.json()
    return data.papers
  } catch (error) {
    console.error("Error searching Semantic Scholar:", error)
    throw error
  }
}

export async function searchSemanticScholarByTopic(topic: string, limit = 10): Promise<Paper[]> {
  try {
    const sanitizedTopic = sanitizeInput(topic)

    // Use our API route instead of directly calling Semantic Scholar
    const response = await fetch(`/api/papers?topic=${encodeURIComponent(sanitizedTopic)}&limit=${limit}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `API request failed with status ${response.status}`)
    }

    const data = await response.json()
    return data.papers
  } catch (error) {
    console.error("Error searching Semantic Scholar by topic:", error)
    throw error
  }
}

export async function searchSemanticScholarByYear(year: string, limit = 10): Promise<Paper[]> {
  try {
    const sanitizedYear = sanitizeInput(year)

    // Use our API route instead of directly calling Semantic Scholar
    const response = await fetch(`/api/papers?year=${encodeURIComponent(sanitizedYear)}&limit=${limit}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `API request failed with status ${response.status}`)
    }

    const data = await response.json()
    return data.papers
  } catch (error) {
    console.error("Error searching Semantic Scholar by year:", error)
    throw error
  }
}
