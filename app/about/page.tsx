import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Search, Zap, Lock } from "lucide-react"

export const metadata: Metadata = {
  title: "About | Academic Papers Search",
  description: "Learn about our secure, privacy-focused academic paper search engine.",
}

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Academic Papers Search</h1>

        <div className="prose dark:prose-invert max-w-none mb-12">
          <p className="text-lg">
            Academic Papers Search is a secure, privacy-focused search portal for academic research papers. We use
            AI-powered semantic search to help researchers find relevant papers based on concepts, not just keywords.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to make academic research more accessible while respecting user privacy. We believe that
            access to knowledge should not come at the cost of personal data.
          </p>

          <h2>Data Sources</h2>
          <p>
            We use the Semantic Scholar API to access a vast database of academic papers across various disciplines. Our
            search is enhanced with AI to provide more relevant results.
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
              <CardTitle>Semantic Search</CardTitle>
              <CardDescription>Find papers based on concepts, not just keywords</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our AI-powered search understands the meaning behind your query, delivering more relevant results.</p>
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
            <Button size="lg">Start Searching</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
