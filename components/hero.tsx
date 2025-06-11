"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Search, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24">
        <div className="max-w-[95vw] sm:max-w-2xl lg:max-w-3xl mx-auto text-center">
          <div className="inline-block bg-gradient-to-r from-purple-700 to-pink-600 p-2 rounded-lg mb-4 sm:mb-6">
            <CreditCard className="h-8 w-8 sm:h-6 sm:w-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Find Your Perfect Credit Card Match
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8">
            Compare credit cards across major Indian banks and discover the best
            offers tailored to your needs with our AI-powered search.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-600 hover:to-pink-600 text-sm sm:text-base"
              onClick={() =>
                document
                  .getElementById("cards")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Cards{" "}
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white hover:text-gray-900 text-sm sm:text-base"
              onClick={() =>
                document
                  .querySelector("[data-search-section]")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Search by
              Features
            </Button>
          </div>
          <div className="mt-6 sm:mt-8 inline-flex items-center gap-2 bg-gray-800/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-xs sm:text-sm">Powered by Gemini AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
