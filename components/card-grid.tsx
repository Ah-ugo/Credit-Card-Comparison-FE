"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Filter, Star, ArrowUpDown, AlertCircle } from "lucide-react"
import { getAllCards } from "@/app/actions"
import CardDetails from "@/components/card-details"

export default function CardGrid() {
  const [cards, setCards] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCard, setSelectedCard] = useState<any>(null)
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recommended")

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true)
        setError(null)
        const fetchedCards = await getAllCards()
        setCards(fetchedCards || [])
      } catch (error) {
        console.error("Failed to fetch cards:", error)
        setError("Failed to load credit cards. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchCards()
  }, [])

  const filterCards = (cards: any[]) => {
    if (filter === "all") return cards

    return cards.filter((card) => {
      switch (filter) {
        case "rewards":
          return (card.rewards_rate || 0) > 1.5
        case "travel":
          return (
            card.benefits?.some(
              (b: string) => b.toLowerCase().includes("lounge") || b.toLowerCase().includes("travel"),
            ) ||
            card.tags?.some((t: string) => t.toLowerCase().includes("travel") || t.toLowerCase().includes("lounge"))
          )
        case "cashback":
          return (card.cashback_rate || 0) > 1 || card.tags?.some((t: string) => t.toLowerCase().includes("cashback"))
        case "noFee":
          return (card.annual_fee || 0) === 0
        case "premium":
          return card.type?.toLowerCase().includes("premium")
        default:
          return true
      }
    })
  }

  const sortCards = (cards: any[]) => {
    switch (sortBy) {
      case "feeAsc":
        return [...cards].sort((a, b) => (a.annual_fee || 0) - (b.annual_fee || 0))
      case "feeDesc":
        return [...cards].sort((a, b) => (b.annual_fee || 0) - (a.annual_fee || 0))
      case "rewardsDesc":
        return [...cards].sort((a, b) => (b.rewards_rate || 0) - (a.rewards_rate || 0))
      case "ratingDesc":
        return [...cards].sort((a, b) => (b.rating || 0) - (a.rating || 0))
      default:
        return cards // recommended order
    }
  }

  const displayedCards = sortCards(filterCards(cards))

  if (error) {
    return (
      <section id="cards" className="py-8">
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Cards</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section id="cards" className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Featured Credit Cards</h2>
          <p className="text-gray-600">{loading ? "Loading cards..." : `${displayedCards.length} cards available`}</p>
        </div>

        {!loading && cards.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cards</SelectItem>
                  <SelectItem value="rewards">Best Rewards</SelectItem>
                  <SelectItem value="travel">Travel Benefits</SelectItem>
                  <SelectItem value="cashback">Cashback Cards</SelectItem>
                  <SelectItem value="noFee">No Annual Fee</SelectItem>
                  <SelectItem value="premium">Premium Cards</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-gray-500" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="feeAsc">Lowest Annual Fee</SelectItem>
                  <SelectItem value="feeDesc">Highest Annual Fee</SelectItem>
                  <SelectItem value="rewardsDesc">Best Rewards</SelectItem>
                  <SelectItem value="ratingDesc">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-40 bg-gray-100"></CardHeader>
              <CardContent className="py-4">
                <div className="h-4 bg-gray-100 rounded mb-3"></div>
                <div className="h-3 bg-gray-100 rounded mb-2"></div>
                <div className="h-3 bg-gray-100 rounded mb-2"></div>
                <div className="h-3 bg-gray-100 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : displayedCards.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCards.map((card) => (
              <Card
                key={card.id || card._id}
                className="overflow-hidden border-gray-200 hover:border-purple-300 transition-all hover:shadow-md"
              >
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">{card.bank}</p>
                      <CardTitle className="text-xl">{card.name}</CardTitle>
                    </div>
                    <div className="flex items-center bg-white p-1.5 rounded-full border">
                      <CreditCard
                        className={`h-5 w-5 ${
                          card.network === "Visa"
                            ? "text-blue-600"
                            : card.network === "Mastercard"
                              ? "text-orange-600"
                              : card.network === "American Express"
                                ? "text-blue-800"
                                : "text-gray-600"
                        }`}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Annual Fee</span>
                        <span className="font-medium">
                          {(card.annual_fee || 0) === 0 ? "Free" : `₹${(card.annual_fee || 0).toLocaleString()}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Rewards Rate</span>
                        <span className="font-medium">{card.rewards_rate || 0}x points</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        {card.summary || "Premium credit card with excellent benefits"}
                      </p>
                      {card.tags && card.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {card.tags.slice(0, 3).map((tag: string, i: number) => (
                            <Badge key={i} variant="outline" className="bg-gray-50">
                              {tag}
                            </Badge>
                          ))}
                          {card.tags.length > 3 && (
                            <Badge variant="outline" className="bg-gray-50">
                              +{card.tags.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-gray-50 flex justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{card.rating || 4.0}</span>
                    <span className="text-xs text-gray-500 ml-1">({card.reviews || 0} reviews)</span>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => setSelectedCard(card)}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          {cards.length === 0 ? (
            <>
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Credit Cards Available</h3>
              <p className="text-gray-600">
                It looks like there are no credit cards in the database yet. Please check back later.
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-500">No cards match your current filters.</p>
              <Button variant="link" onClick={() => setFilter("all")} className="mt-2">
                Clear filters
              </Button>
            </>
          )}
        </div>
      )}

      {selectedCard && <CardDetails card={selectedCard} onClose={() => setSelectedCard(null)} />}
    </section>
  )
}
