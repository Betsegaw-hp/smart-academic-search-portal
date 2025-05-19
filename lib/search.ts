import { sanitizeInput } from "./utils"
import {
  type Paper,
  searchSemanticScholar,
  searchSemanticScholarByTopic,
  searchSemanticScholarByYear,
} from "./semantic-scholar"

interface SearchParams {
  query?: string
  topic?: string
  year?: string
}

export async function searchPapers({ query, topic, year }: SearchParams): Promise<Paper[]> {
  // Sanitize inputs
  const sanitizedQuery = query ? sanitizeInput(query) : ""
  const sanitizedTopic = topic ? sanitizeInput(topic) : ""
  const sanitizedYear = year ? sanitizeInput(year) : ""

  try {
    // If we have a query, that takes precedence
    if (sanitizedQuery) {
      return await searchSemanticScholar(sanitizedQuery)
    }

    // If we have a topic but no query
    if (sanitizedTopic && sanitizedTopic !== "all") {
      return await searchSemanticScholarByTopic(sanitizedTopic)
    }

    // If we have a year but no query or topic
    if (sanitizedYear && sanitizedYear !== "all") {
      return await searchSemanticScholarByYear(sanitizedYear)
    }

    // If we have no specific parameters, return recent papers
    // This is a fallback that shouldn't normally be reached
    return await searchSemanticScholar("recent research")
  } catch (error) {
    console.error("Error in searchPapers:", error)

    // If the API fails, fall back to mock data
    console.log("Falling back to mock data due to API error")

    // Filter mock data based on search parameters
    let filteredPapers = mockPapers

    if (sanitizedQuery) {
      const lowerQuery = sanitizedQuery.toLowerCase()
      filteredPapers = filteredPapers.filter(
        (paper) =>
          paper.title.toLowerCase().includes(lowerQuery) ||
          paper.abstract.toLowerCase().includes(lowerQuery) ||
          paper.authors.some((author) => author.toLowerCase().includes(lowerQuery)) ||
          paper.topics.some((topic) => topic.toLowerCase().includes(lowerQuery)),
      )
    }

    if (sanitizedTopic && sanitizedTopic !== "all") {
      const lowerTopic = sanitizedTopic.toLowerCase()
      filteredPapers = filteredPapers.filter((paper) =>
        paper.topics.some((topic) => topic.toLowerCase().includes(lowerTopic)),
      )
    }

    if (sanitizedYear && sanitizedYear !== "all") {
      filteredPapers = filteredPapers.filter((paper) => paper.year === sanitizedYear)
    }

    return filteredPapers
  }
}

// Mock data for fallback when API fails
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
    citationCount: 45000,
    isOpenAccess: true,
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
    citationCount: 30000,
    isOpenAccess: true,
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
    citationCount: 70000,
    isOpenAccess: true,
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
    citationCount: 2500,
    isOpenAccess: false,
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
    citationCount: 3000,
    isOpenAccess: false,
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
    citationCount: 12000,
    isOpenAccess: true,
  },
  {
    id: "7",
    title: "Renewable Energy Integration: Challenges and Solutions",
    abstract:
      "This paper reviews the challenges of integrating renewable energy sources into existing power grids and proposes technical and policy solutions.",
    authors: ["Sarah Johnson", "Michael Chen", "Priya Patel"],
    year: "2020",
    url: "https://www.sciencedirect.com/science/article/pii/S1364032119305994",
    topics: ["Renewable Energy", "Electrical Engineering"],
    citationCount: 450,
    isOpenAccess: false,
  },
  {
    id: "8",
    title: "Advances in Neural Information Processing Systems",
    abstract:
      "This paper presents recent advances in neural network architectures and training methods for processing complex information.",
    authors: ["Alex Turner", "Maria Rodriguez", "David Kim"],
    year: "2021",
    url: "https://papers.nips.cc/paper/2020",
    topics: ["Machine Learning", "Artificial Intelligence", "Neuroscience"],
    citationCount: 120,
    isOpenAccess: true,
  },
  {
    id: "9",
    title: "Climate Change Impact on Biodiversity: A Systematic Review",
    abstract:
      "A comprehensive review of how climate change affects biodiversity across different ecosystems and geographic regions.",
    authors: ["Emma Wilson", "James Taylor", "Sophia Garcia"],
    year: "2022",
    url: "https://www.sciencedirect.com/science/article/pii/S0006320721000793",
    topics: ["Climate Science", "Ecology", "Environmental Science"],
    citationCount: 85,
    isOpenAccess: false,
  },
  {
    id: "10",
    title: "Quantum Algorithms for Optimization Problems",
    abstract:
      "This paper explores how quantum computing can be applied to solve complex optimization problems more efficiently than classical algorithms.",
    authors: ["Robert Chen", "Lisa Wang", "Thomas Brown"],
    year: "2023",
    url: "https://arxiv.org/abs/2201.05779",
    topics: ["Quantum Computing", "Computer Science", "Optimization"],
    citationCount: 30,
    isOpenAccess: true,
  },
]
