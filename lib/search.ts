import { sanitizeInput } from "./utils"

// Define the Paper interface
export interface Paper {
  id: string
  title: string
  abstract: string
  authors: string[]
  year: string
  url: string
  topics: string[]
}

interface SearchParams {
  query?: string
  topic?: string
  year?: string
}

// This would normally call the Semantic Scholar API and use OpenAI for embeddings
// For this example, we'll use mock data
export async function searchPapers({ query, topic, year }: SearchParams): Promise<Paper[]> {
  // In a real implementation, we would:
  // 1. Generate embeddings for the query using OpenAI
  // 2. Call Semantic Scholar API with proper parameters
  // 3. Process and filter results

  // Sanitize inputs
  const sanitizedQuery = query ? sanitizeInput(query) : ""
  const sanitizedTopic = topic ? sanitizeInput(topic) : ""
  const sanitizedYear = year ? sanitizeInput(year) : ""

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Filter mock data based on search parameters
  return mockPapers.filter((paper) => {
    const matchesQuery =
      !sanitizedQuery ||
      paper.title.toLowerCase().includes(sanitizedQuery.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(sanitizedQuery.toLowerCase())

    const matchesTopic = !sanitizedTopic || paper.topics.some((t) => t.toLowerCase() === sanitizedTopic.toLowerCase())

    const matchesYear = !sanitizedYear || paper.year === sanitizedYear

    return matchesQuery && matchesTopic && matchesYear
  })
}

// Mock data for demonstration
const mockPapers: Paper[] = [
  {
    id: "1",
    title: "Attention Is All You Need",
    abstract:
      "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
    authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit"],
    year: "2017",
    url: "https://arxiv.org/abs/1706.03762",
    topics: ["Machine Learning", "Artificial Intelligence", "Natural Language Processing"],
  },
  {
    id: "2",
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    abstract:
      "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers.",
    authors: ["Jacob Devlin", "Ming-Wei Chang", "Kenton Lee", "Kristina Toutanova"],
    year: "2018",
    url: "https://arxiv.org/abs/1810.04805",
    topics: ["Machine Learning", "Natural Language Processing"],
  },
  {
    id: "3",
    title: "Deep Residual Learning for Image Recognition",
    abstract:
      "We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously.",
    authors: ["Kaiming He", "Xiangyu Zhang", "Shaoqing Ren", "Jian Sun"],
    year: "2015",
    url: "https://arxiv.org/abs/1512.03385",
    topics: ["Machine Learning", "Computer Vision"],
  },
  {
    id: "4",
    title: "Climate Tipping Points — Too Risky to Bet Against",
    abstract:
      "Evidence is mounting that these events could be more likely than was thought, have high impacts and are interconnected across different biophysical systems, potentially committing the world to long-term irreversible changes.",
    authors: ["Timothy M. Lenton", "Johan Rockström", "Owen Gaffney", "Stefan Rahmstorf"],
    year: "2019",
    url: "https://www.nature.com/articles/d41586-019-03595-0",
    topics: ["Climate Science", "Environmental Science"],
  },
  {
    id: "5",
    title: "Quantum Supremacy Using a Programmable Superconducting Processor",
    abstract:
      "We report the use of a quantum processor to perform a computational task that would be prohibitively difficult for classical computers, achieving quantum supremacy.",
    authors: ["Frank Arute", "Kunal Arya", "Ryan Babbush", "Dave Bacon"],
    year: "2019",
    url: "https://www.nature.com/articles/s41586-019-1666-5",
    topics: ["Quantum Computing", "Computer Science"],
  },
  {
    id: "6",
    title: "The Brain's Default Mode Network",
    abstract:
      "The default mode network (DMN) is a set of brain regions that show increased activity during rest and decreased activity during explicit task performance.",
    authors: ["Marcus E. Raichle", "Ann Mary MacLeod", "Abraham Z. Snyder", "William J. Powers"],
    year: "2001",
    url: "https://www.pnas.org/content/98/2/676",
    topics: ["Neuroscience", "Cognitive Science"],
  },
  {
    id: "7",
    title: "Renewable Energy Integration: Challenges and Solutions",
    abstract:
      "This paper reviews the challenges of integrating renewable energy sources into existing power grids and proposes technical and policy solutions.",
    authors: ["Sarah Johnson", "Michael Chen", "Priya Patel"],
    year: "2020",
    url: "https://example.com/renewable-energy-integration",
    topics: ["Renewable Energy", "Electrical Engineering"],
  },
  {
    id: "8",
    title: "Advances in Neural Information Processing Systems",
    abstract:
      "This paper presents recent advances in neural network architectures and training methods for processing complex information.",
    authors: ["Alex Turner", "Maria Rodriguez", "David Kim"],
    year: "2021",
    url: "https://example.com/neural-information-processing",
    topics: ["Machine Learning", "Artificial Intelligence", "Neuroscience"],
  },
  {
    id: "9",
    title: "Climate Change Impact on Biodiversity: A Systematic Review",
    abstract:
      "A comprehensive review of how climate change affects biodiversity across different ecosystems and geographic regions.",
    authors: ["Emma Wilson", "James Taylor", "Sophia Garcia"],
    year: "2022",
    url: "https://example.com/climate-biodiversity-review",
    topics: ["Climate Science", "Ecology", "Environmental Science"],
  },
  {
    id: "10",
    title: "Quantum Algorithms for Optimization Problems",
    abstract:
      "This paper explores how quantum computing can be applied to solve complex optimization problems more efficiently than classical algorithms.",
    authors: ["Robert Chen", "Lisa Wang", "Thomas Brown"],
    year: "2023",
    url: "https://example.com/quantum-optimization",
    topics: ["Quantum Computing", "Computer Science", "Optimization"],
  },
]
