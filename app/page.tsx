import { Suspense } from "react"
import Hero from "@/components/hero"
import CardGrid from "@/components/card-grid"
import SearchSection from "@/components/search-section"
import ComparisonSection from "@/components/comparison-section"
import { Loader2 } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero />
      <div className="container mx-auto px-4 py-12 space-y-16">
        <SearchSection />
        <Suspense
          fallback={
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          }
        >
          <CardGrid />
        </Suspense>
        <ComparisonSection />
      </div>
    </main>
  )
}
