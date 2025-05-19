"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Filter, X } from "lucide-react"

export function PaperFilters({
  initialTopic,
  initialYear,
}: {
  initialTopic?: string
  initialYear?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [topic, setTopic] = useState(initialTopic || "")
  const [year, setYear] = useState(initialYear || "")

  // Generate years from 2023 down to 2000
  const years = Array.from({ length: 24 }, (_, i) => (2023 - i).toString())

  // Popular research topics
  const topics = [
    "Machine Learning",
    "Climate Science",
    "Quantum Computing",
    "Neuroscience",
    "Renewable Energy",
    "Artificial Intelligence",
    "Genomics",
    "Cybersecurity",
    "Blockchain",
    "Robotics",
  ]

  const applyFilters = () => {
    const query = searchParams.get("query") || ""
    const params = new URLSearchParams()

    if (query) params.set("query", query)
    if (topic) params.set("topic", topic)
    if (year) params.set("year", year)

    router.push(`/?${params.toString()}`)
  }

  const clearFilters = () => {
    const query = searchParams.get("query") || ""
    setTopic("")
    setYear("")

    if (query) {
      router.push(`/?query=${encodeURIComponent(query)}`)
    } else {
      router.push("/")
    }
  }

  const hasActiveFilters = topic || year

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="topic" className="text-sm font-medium">
            Research Topic
          </label>
          <Select value={topic} onValueChange={setTopic}>
            <SelectTrigger id="topic">
              <SelectValue placeholder="Select topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              {topics.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="year" className="text-sm font-medium">
            Publication Year
          </label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger id="year">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Button onClick={applyFilters}>Apply Filters</Button>
          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters} className="flex items-center gap-1">
              <X className="h-4 w-4" /> Clear Filters
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
