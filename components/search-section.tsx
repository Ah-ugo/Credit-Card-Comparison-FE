"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Sparkles, Search, Loader2 } from "lucide-react"
import { searchCards } from "@/app/actions"

export default function SearchSection() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState("")

  const exampleQueries = [
    "Show me cards that offer lounge access and high cashback on fuel",
    "Best credit cards for first-time users with no annual fee",
    "Compare premium cards with travel benefits under 5000 annual fee",
    "Cards with highest reward points for online shopping",
    "Best cashback cards for dining and entertainment",
  ]

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setQuery(searchQuery)
    try {
      const response = await searchCards(searchQuery)
      setResults(response.cards || [])
      setAiResponse(response.ai_response || response.aiResponse || "")
    } catch (error) {
      console.error("Search failed:", error)
      setAiResponse("Sorry, I couldn't process your search at the moment. Please try again.")
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(query)
    }
  }

  return (
    <section className="py-8" data-search-section>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <h2 className="text-2xl font-bold">AI-Powered Card Search</h2>
          </div>
          <p className="text-gray-600 text-center mb-6">
            Ask in plain language to find cards that match your specific needs
          </p>

          <div className="w-full flex gap-2">
            <Input
              placeholder="E.g., 'Cards with airport lounge access and no annual fee'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              onClick={() => handleSearch(query)}
              disabled={loading || !query.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
              Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {exampleQueries.map((exampleQuery, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start text-left h-auto py-3 text-sm hover:bg-purple-50 hover:border-purple-200"
              onClick={() => handleSearch(exampleQuery)}
              disabled={loading}
            >
              "{exampleQuery}"
            </Button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-10">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500 mx-auto mb-2" />
              <p className="text-gray-600">Searching for the best cards for you...</p>
            </div>
          </div>
        )}

        {aiResponse && !loading && (
          <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100 mb-6">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900 mb-2">AI Response</h3>
                <div className="text-gray-700 whitespace-pre-wrap">{aiResponse}</div>
              </div>
            </div>
          </Card>
        )}

        {results && results.length > 0 && !loading && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Search Results ({results.length} cards found)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((card) => (
                <Card key={card.id || card._id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-gray-500">{card.bank}</p>
                      <h4 className="font-semibold">{card.name}</h4>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{card.summary}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Annual Fee:</span>
                    <span className="font-medium">
                      {card.annual_fee === 0 ? "Free" : `₹${card.annual_fee?.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Rewards:</span>
                    <span className="font-medium">{card.rewards_rate}x points</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {results && results.length === 0 && !loading && aiResponse && (
          <div className="text-center py-6">
            <p className="text-gray-500">No cards found matching your criteria. Try a different search query.</p>
          </div>
        )}
      </div>
    </section>
  )
}
