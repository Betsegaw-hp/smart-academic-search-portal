import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Privacy Policy | Scholar Search",
  description: "Our commitment to your privacy and data security.",
}

export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 font-display">Privacy Policy</h1>

        <div className="prose dark:prose-invert max-w-none mb-12">
          <p className="text-lg">
            At Scholar Search, we take your privacy seriously. This policy outlines our practices regarding data
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
            service to fetch results, but we do not share any identifying information about you. For more information
            about Semantic Scholar's privacy practices, please visit their{" "}
            <a href="https://www.semanticscholar.org/privacy" target="_blank" rel="noopener noreferrer">
              privacy policy
            </a>
            .
          </p>

          <p>
            When you enable the DuckDuckGo search option, your search queries are sent to DuckDuckGo's API to retrieve
            additional results. DuckDuckGo is a privacy-focused search engine that does not track users or store
            personal information. For more information about DuckDuckGo's privacy practices, please visit their{" "}
            <a href="https://duckduckgo.com/privacy" target="_blank" rel="noopener noreferrer">
              privacy policy
            </a>
            .
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
          <p>If you have any questions about our privacy practices, please contact us at privacy@scholarsearch.org.</p>
        </div>

        <div className="text-center">
          <Link href="/">
            <Button size="lg" className="rounded-xl">
              Return to Search
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
