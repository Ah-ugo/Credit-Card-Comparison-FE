"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { compareCards, getAllCards } from "@/app/actions"
import { Check, X, Loader2, ArrowRight } from "lucide-react"

export default function ComparisonSection() {
  const [cards, setCards] = useState<any[]>([])
  const [card1, setCard1] = useState("")
  const [card2, setCard2] = useState("")
  const [comparison, setComparison] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const fetchedCards = await getAllCards()
        setCards(fetchedCards || [])
      } catch (error) {
        console.error("Failed to fetch cards for comparison:", error)
      }
    }

    fetchCards()
  }, [])

  const handleCompare = async () => {
    if (!card1 || !card2 || card1 === card2) return

    setLoading(true)
    try {
      const result = await compareCards(card1, card2)
      setComparison(result)
    } catch (error) {
      console.error("Comparison failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const getBooleanValue = (card: any, field: string) => {
    // Check various possible boolean indicators
    if (card[field] !== undefined) return card[field]

    // Check in benefits array
    if (card.benefits && Array.isArray(card.benefits)) {
      const fieldLower = field.toLowerCase()
      return card.benefits.some(
        (benefit: string) =>
          benefit.toLowerCase().includes(fieldLower) ||
          (fieldLower.includes("lounge") && benefit.toLowerCase().includes("lounge")) ||
          (fieldLower.includes("fuel") && benefit.toLowerCase().includes("fuel")) ||
          (fieldLower.includes("movie") && benefit.toLowerCase().includes("movie")) ||
          (fieldLower.includes("dining") && benefit.toLowerCase().includes("dining")),
      )
    }

    // Check in tags array
    if (card.tags && Array.isArray(card.tags)) {
      const fieldLower = field.toLowerCase()
      return card.tags.some(
        (tag: string) =>
          tag.toLowerCase().includes(fieldLower) ||
          (fieldLower.includes("lounge") && tag.toLowerCase().includes("lounge")) ||
          (fieldLower.includes("travel") && tag.toLowerCase().includes("travel")),
      )
    }

    return false
  }

  return (
    <section id="compare" className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Compare Credit Cards</h2>
          <p className="text-gray-600">Select two cards to see a detailed side-by-side comparison</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">First Card</label>
            <Select value={card1} onValueChange={setCard1}>
              <SelectTrigger>
                <SelectValue placeholder="Select a card" />
              </SelectTrigger>
              <SelectContent>
                {cards.map((card) => (
                  <SelectItem key={card.id || card._id} value={card.id || card._id}>
                    {card.name} ({card.bank})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="h-5 w-5 text-gray-400 mx-2" />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Second Card</label>
            <Select value={card2} onValueChange={setCard2}>
              <SelectTrigger>
                <SelectValue placeholder="Select a card" />
              </SelectTrigger>
              <SelectContent>
                {cards.map((card) => (
                  <SelectItem key={card.id || card._id} value={card.id || card._id}>
                    {card.name} ({card.bank})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleCompare}
            disabled={!card1 || !card2 || card1 === card2 || loading || cards.length === 0}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Compare"}
          </Button>
        </div>

        {cards.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No cards available for comparison. Please check back later.</p>
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-10">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500 mx-auto mb-2" />
              <p className="text-gray-600">Comparing cards and generating AI insights...</p>
            </div>
          </div>
        )}

        {comparison && !loading && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Comparison: {comparison.card1?.name} vs {comparison.card2?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="col-span-1 font-medium">Feature</div>
                <div className="col-span-1 font-medium text-center">{comparison.card1?.name}</div>
                <div className="col-span-1 font-medium text-center">{comparison.card2?.name}</div>

                {/* Annual Fee */}
                <div className="col-span-1 py-2 border-t">Annual Fee</div>
                <div className="col-span-1 text-center py-2 border-t">
                  {(comparison.card1?.annual_fee || 0) === 0
                    ? "Free"
                    : `₹${(comparison.card1?.annual_fee || 0).toLocaleString()}`}
                </div>
                <div className="col-span-1 text-center py-2 border-t">
                  {(comparison.card2?.annual_fee || 0) === 0
                    ? "Free"
                    : `₹${(comparison.card2?.annual_fee || 0).toLocaleString()}`}
                </div>

                {/* Rewards Rate */}
                <div className="col-span-1 py-2">Rewards Rate</div>
                <div className="col-span-1 text-center py-2">{comparison.card1?.rewards_rate || 1}x points</div>
                <div className="col-span-1 text-center py-2">{comparison.card2?.rewards_rate || 1}x points</div>

                {/* Welcome Bonus */}
                <div className="col-span-1 py-2">Welcome Bonus</div>
                <div className="col-span-1 text-center py-2">{comparison.card1?.welcome_bonus || "Available"}</div>
                <div className="col-span-1 text-center py-2">{comparison.card2?.welcome_bonus || "Available"}</div>

                {/* Airport Lounge Access */}
                <div className="col-span-1 py-2">Airport Lounge Access</div>
                <div className="col-span-1 text-center py-2">
                  {getBooleanValue(comparison.card1, "lounge_access") ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  )}
                </div>
                <div className="col-span-1 text-center py-2">
                  {getBooleanValue(comparison.card2, "lounge_access") ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  )}
                </div>

                {/* Fuel Surcharge Waiver */}
                <div className="col-span-1 py-2">Fuel Surcharge Waiver</div>
                <div className="col-span-1 text-center py-2">
                  {getBooleanValue(comparison.card1, "fuel_surcharge_waiver") ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  )}
                </div>
                <div className="col-span-1 text-center py-2">
                  {getBooleanValue(comparison.card2, "fuel_surcharge_waiver") ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  )}
                </div>

                {/* Movie Benefits */}
                <div className="col-span-1 py-2">Movie Benefits</div>
                <div className="col-span-1 text-center py-2">
                  {getBooleanValue(comparison.card1, "movie_benefits") ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  )}
                </div>
                <div className="col-span-1 text-center py-2">
                  {getBooleanValue(comparison.card2, "movie_benefits") ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  )}
                </div>

                {/* Dining Benefits */}
                <div className="col-span-1 py-2">Dining Benefits</div>
                <div className="col-span-1 text-center py-2">
                  {getBooleanValue(comparison.card1, "dining_benefits") ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  )}
                </div>
                <div className="col-span-1 text-center py-2">
                  {getBooleanValue(comparison.card2, "dining_benefits") ? (
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  )}
                </div>
              </div>

              {comparison.ai_summary && (
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <h3 className="font-medium text-purple-800 mb-2">AI Comparison Summary</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{comparison.ai_summary}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
