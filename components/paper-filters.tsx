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

  // Generate years from current year down to 2000
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1999 }, (_, i) => (currentYear - i).toString())

  // Popular research topics from Semantic Scholar
  const topics = [
    "Computer Science",
    "Medicine",
    "Biology",
    "Physics",
    "Mathematics",
    "Engineering",
    "Psychology",
    "Economics",
    "Chemistry",
    "Environmental Science",
    "Materials Science",
    "Political Science",
    "Sociology",
    "Business",
    "Philosophy",
    "Art",
    "Geology",
    "Geography",
    "History",
    "Linguistics",
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
    <Card className="border-2 border-sage-200 bg-background/90 backdrop-blur-sm rounded-3xl shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl font-display">
          <Filter className="h-5 w-5 text-sage-600" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="topic" className="text-sm font-medium">
            Research Field
          </label>
          <Select value={topic} onValueChange={setTopic}>
            <SelectTrigger id="topic" className="rounded-xl border-sage-200 bg-background">
              <SelectValue placeholder="Select field" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-sage-200">
              <SelectItem value="all">All Fields</SelectItem>
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
            <SelectTrigger id="year" className="rounded-xl border-sage-200 bg-background">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-sage-200">
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
          <Button onClick={applyFilters} className="rounded-xl">
            Apply Filters
          </Button>
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex items-center gap-1 rounded-xl border-sage-200"
            >
              <X className="h-4 w-4" /> Clear Filters
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
