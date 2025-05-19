import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Privacy Policy | Academic Papers Search",
  description: "Our commitment to your privacy and data security.",
}

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <div className="prose dark:prose-invert max-w-none mb-12">
          <p className="text-lg">
            At Academic Papers Search, we take your privacy seriously. This policy outlines our practices regarding data
            collection and usage.
          </p>

          <h2>What We Collect</h2>
          <p>
            <strong>Nothing.</strong> We do not collect any personal information, search history, or browsing data. We
            do not use cookies, trackers, or analytics tools that could identify you or your device.
          </p>

          <h2>Search Queries</h2>
          <p>
            Your search queries are processed only to provide you with relevant results. They are not stored, logged, or
            used for any other purpose. Searches are completely anonymous.
          </p>

          <h2>Third-Party APIs</h2>
          <p>
            We use the Semantic Scholar API to retrieve academic paper data. Your queries are transmitted to this
            service to fetch results, but we do not share any identifying information about you.
          </p>

          <h2>AI Processing</h2>
          <p>
            For semantic search capabilities, we use OpenAI's API. Your search queries are processed to generate
            embeddings for better search results, but are not stored or used for training AI models.
          </p>

          <h2>Security</h2>
          <p>We implement several security measures to protect your privacy:</p>
          <ul>
            <li>HTTPS encryption for all traffic</li>
            <li>Content Security Policy (CSP) headers</li>
            <li>Cross-Origin Resource Sharing (CORS) restrictions</li>
            <li>Input sanitization to prevent injection attacks</li>
            <li>Server-side processing of sensitive operations</li>
          </ul>

          <h2>Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. Any changes will be posted on this page.</p>

          <h2>Contact</h2>
          <p>If you have any questions about our privacy practices, please contact us at privacy@example.com.</p>
        </div>

        <div className="text-center">
          <Link href="/">
            <Button size="lg">Return to Search</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
