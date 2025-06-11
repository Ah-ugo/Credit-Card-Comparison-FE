"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  CreditCard,
  X,
  Star,
  TrendingUp,
  Gift,
  Shield,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CardDetails({
  card,
  onClose,
}: {
  card: any;
  onClose: () => void;
}) {
  // Generate mock price history data based on current annual fee
  const generatePriceHistory = (currentFee: number) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months.map((month, index) => ({
      month,
      fee: Math.max(0, currentFee + (Math.random() - 0.5) * currentFee * 0.2),
    }));
  };

  const priceHistory = generatePriceHistory(card.annual_fee || 0);

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] max-w-[400px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[900px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">{card.bank}</p>
              <DialogTitle className="text-xl sm:text-2xl">
                {card.name}
              </DialogTitle>
              <DialogDescription className="mt-1 flex items-center text-sm">
                <CreditCard
                  className={`h-4 w-4 mr-1 ${
                    card.network === "Visa"
                      ? "text-blue-600"
                      : card.network === "Mastercard"
                      ? "text-orange-600"
                      : card.network === "American Express"
                      ? "text-blue-800"
                      : "text-gray-600"
                  }`}
                />
                {card.network || "Credit Card"} • {card.type || "Premium"}
              </DialogDescription>
            </div>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="self-end sm:self-start"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 gap-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-medium text-sm sm:text-base">
                {card.rating || 4.0}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 ml-1">
                ({card.reviews || 0} reviews)
              </span>
            </div>
            {card.tags && card.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {card.tags.map((tag: string, i: number) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="bg-gray-50 text-xs sm:text-sm"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-4 gap-2">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">
                Overview
              </TabsTrigger>
              <TabsTrigger value="benefits" className="text-xs sm:text-sm">
                Benefits
              </TabsTrigger>
              <TabsTrigger value="fees" className="text-xs sm:text-sm">
                Fees & Rates
              </TabsTrigger>
              <TabsTrigger value="history" className="text-xs sm:text-sm">
                Price History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {card.ai_summary && (
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <h3 className="font-medium text-purple-800 mb-2 flex items-center text-sm sm:text-base">
                    <Gift className="h-4 w-4 mr-2" /> AI Summary
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {card.ai_summary}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2 flex items-center text-sm sm:text-base">
                      <Gift className="h-4 w-4 mr-2 text-purple-600" /> Key
                      Benefits
                    </h3>
                    {card.benefits && card.benefits.length > 0 ? (
                      <ul className="space-y-2">
                        {card.benefits
                          .slice(0, 4)
                          .map((benefit: string, i: number) => (
                            <li
                              key={i}
                              className="text-xs sm:text-sm flex items-start"
                            >
                              <span className="text-purple-600 mr-2">•</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="text-xs sm:text-sm text-gray-500">
                        No specific benefits listed
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2 flex items-center text-sm sm:text-base">
                      <TrendingUp className="h-4 w-4 mr-2 text-green-600" />{" "}
                      Rewards Structure
                    </h3>
                    {card.rewards_structure &&
                    card.rewards_structure.length > 0 ? (
                      <ul className="space-y-2">
                        {card.rewards_structure.map(
                          (reward: string, i: number) => (
                            <li
                              key={i}
                              className="text-xs sm:text-sm flex items-start"
                            >
                              <span className="text-green-600 mr-2">•</span>
                              <span>{reward}</span>
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <ul className="space-y-2">
                        <li className="text-xs sm:text-sm flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span>
                            {card.rewards_rate || 1}X reward points on all
                            spends
                          </span>
                        </li>
                        <li className="text-xs sm:text-sm flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span>Bonus points on select categories</span>
                        </li>
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2 flex items-center text-sm sm:text-base">
                    <Shield className="h-4 w-4 mr-2 text-blue-600" />{" "}
                    Eligibility & Requirements
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">
                        Minimum Income
                      </p>
                      <p className="font-medium text-sm sm:text-base">
                        ₹{(card.min_income || 600000).toLocaleString()} per
                        annum
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">
                        Credit Score
                      </p>
                      <p className="font-medium text-sm sm:text-base">
                        {card.min_credit_score || 700}+
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">
                        Age Requirement
                      </p>
                      <p className="font-medium text-sm sm:text-base">
                        {card.age_requirement || "21-60 years"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">
                        Documents Required
                      </p>
                      <p className="font-medium text-sm sm:text-base">
                        {card.documents_required?.join(", ") ||
                          "PAN Card, Aadhaar Card, Income Proof"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="benefits" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3 text-sm sm:text-base">
                    All Benefits
                  </h3>
                  {card.benefits && card.benefits.length > 0 ? (
                    <ul className="space-y-2">
                      {card.benefits.map((benefit: string, i: number) => (
                        <li
                          key={i}
                          className="text-xs sm:text-sm flex items-start"
                        >
                          <span className="text-purple-600 mr-2">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs sm:text-sm text-gray-500">
                      No specific benefits listed for this card.
                    </p>
                  )}
                </CardContent>
              </Card>

              {card.welcome_offers && card.welcome_offers.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3 text-sm sm:text-base">
                      Welcome Offers
                    </h3>
                    <ul className="space-y-2">
                      {card.welcome_offers.map((offer: string, i: number) => (
                        <li
                          key={i}
                          className="text-xs sm:text-sm flex items-start"
                        >
                          <span className="text-green-600 mr-2">•</span>
                          <span>{offer}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="fees" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3 text-sm sm:text-base">
                      Fees
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Annual Fee
                        </p>
                        <p className="font-medium text-sm sm:text-base">
                          {(card.annual_fee || 0) === 0
                            ? "Free"
                            : `₹${(card.annual_fee || 0).toLocaleString()}`}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Joining Fee
                        </p>
                        <p className="font-medium text-sm sm:text-base">
                          {(card.joining_fee || 0) === 0
                            ? "Free"
                            : `₹${(card.joining_fee || 0).toLocaleString()}`}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Add-on Card Fee
                        </p>
                        <p className="font-medium text-sm sm:text-base">
                          {(card.add_on_card_fee || 0) === 0
                            ? "Free"
                            : `₹${(
                                card.add_on_card_fee || 0
                              ).toLocaleString()}`}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Foreign Transaction Fee
                        </p>
                        <p className="font-medium text-sm sm:text-base">
                          {card.foreign_transaction_fee || 3.5}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3 text-sm sm:text-base">
                      Interest Rates
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Interest Rate (p.a.)
                        </p>
                        <p className="font-medium text-sm sm:text-base">
                          {card.interest_rate || 3.49}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Cash Advance Fee
                        </p>
                        <p className="font-medium text-sm sm:text-base">
                          {card.cash_advance_fee || 2.5}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Late Payment Fee
                        </p>
                        <p className="font-medium text-sm sm:text-base">
                          ₹{(card.late_payment_fee || 750).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Over Limit Fee
                        </p>
                        <p className="font-medium text-sm sm:text-base">
                          ₹{(card.over_limit_fee || 600).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {card.fee_waiver_conditions &&
                card.fee_waiver_conditions.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-3 text-sm sm:text-base">
                        Fee Waiver Conditions
                      </h3>
                      <ul className="space-y-2">
                        {card.fee_waiver_conditions.map(
                          (condition: string, i: number) => (
                            <li
                              key={i}
                              className="text-xs sm:text-sm flex items-start"
                            >
                              <span className="text-blue-600 mr-2">•</span>
                              <span>{condition}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                )}
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3 flex items-center text-sm sm:text-base">
                    <Calendar className="h-4 w-4 mr-2 text-blue-600" /> Annual
                    Fee History
                  </h3>
                  <div className="h-[200px] sm:h-[250px] md:h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={priceHistory}
                        margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip
                          formatter={(value) => [
                            `₹${Math.round(Number(value))}`,
                            "Annual Fee",
                          ]}
                        />
                        <Line
                          type="monotone"
                          dataKey="fee"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-3">
                    Annual fee history over the past 12 months. Fees may vary
                    based on promotions and offers.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
            Apply Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
