"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CreditCard, Search, Sparkles } from "lucide-react"

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg mb-6">
            <CreditCard className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Credit Card Match</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Compare credit cards across major Indian banks and discover the best offers tailored to your needs with our
            AI-powered search.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={() => document.getElementById("cards")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Cards <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900"
              onClick={() => document.querySelector("[data-search-section]")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Search className="mr-2 h-5 w-5" /> Search by Features
            </Button>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-sm">Powered by Gemini AI</span>
          </div>
        </div>
      </div>
    </div>
  )
}
