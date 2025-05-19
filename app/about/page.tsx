import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Search, Zap, Lock } from "lucide-react"

export const metadata: Metadata = {
  title: "About | Scholar Search",
  description: "Learn about our secure, privacy-focused academic paper search engine.",
}

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 font-display">About Scholar Search</h1>

        <div className="prose dark:prose-invert max-w-none mb-12">
          <p className="text-lg">
            Scholar Search is a secure, privacy-focused search portal for academic research papers. We use the Semantic
            Scholar API to help researchers find relevant papers across various disciplines.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to make academic research more accessible while respecting user privacy. We believe that
            access to knowledge should not come at the cost of personal data.
          </p>

          <h2>Data Sources</h2>
          <p>
            We use the Semantic Scholar API to access a vast database of academic papers across various disciplines.
            Semantic Scholar is a free, AI-powered research tool for scientific literature maintained by the Allen
            Institute for AI.
          </p>

          <p>
            For additional search capabilities, we also offer integration with DuckDuckGo, a privacy-focused search
            engine that doesn't track users or store personal information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Privacy-First</CardTitle>
              <CardDescription>No tracking, no cookies, no data collection</CardDescription>
            </CardHeader>
            <CardContent>
              <p>We don't track your searches or store any personal data. Your research interests remain private.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Search className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Real-Time Search</CardTitle>
              <CardDescription>Find papers from millions of academic sources</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our search connects directly to the Semantic Scholar database, giving you access to millions of academic
                papers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Fast & Accessible</CardTitle>
              <CardDescription>Optimized for speed and usability</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Built with modern web technologies for a fast, responsive experience on any device.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Lock className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Secure By Design</CardTitle>
              <CardDescription>Built with security best practices</CardDescription>
            </CardHeader>
            <CardContent>
              <p>HTTPS, Content Security Policy, and input sanitization keep your browsing secure.</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/">
            <Button size="lg" className="rounded-xl">
              Start Searching
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
