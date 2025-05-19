// Utility functions for interacting with Google's Gemini API

/**
 * Generate embeddings for a text using Google's Gemini API
 * This uses the embedding-001 model which is designed for semantic search
 */
export async function generateEmbedding(text: string, apiKey: string): Promise<number[]> {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/embedding-001:embedContent?key=" + apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "embedding-001",
          content: {
            parts: [
              {
                text: text,
              },
            ],
          },
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Gemini API error:", errorData)
      throw new Error(`API request failed with status ${response.status}`)
    }

    const result = await response.json()
    return result.embedding.values
  } catch (error) {
    console.error("Error generating embedding:", error)
    // Return a fallback embedding (all zeros) in case of error
    return Array(768).fill(0)
  }
}

/**
 * Calculate cosine similarity between two vectors
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))

  // Avoid division by zero
  if (magnitudeA === 0 || magnitudeB === 0) return 0

  return dotProduct / (magnitudeA * magnitudeB)
}

/**
 * Pre-compute embeddings for a set of papers
 * In a real application, these would be stored in a vector database
 */
export async function generatePaperEmbeddings(papers: any[], apiKey: string) {
  const embeddings: Record<string, number[]> = {}

  for (const paper of papers) {
    // Create a combined text representation of the paper
    const paperText = `${paper.title}. ${paper.abstract}`

    // Generate embedding
    const embedding = await generateEmbedding(paperText, apiKey)
    embeddings[paper.id] = embedding
  }

  return embeddings
}
