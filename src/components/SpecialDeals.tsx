
"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Deal {
  title: string
  description: string
  image: string
}

const deals: Deal[] = [
  {
    title: "Deal 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Deal 2",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Deal 3",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Deal 4",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

export default function SpecialDeals() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector(".deal-card")?.clientWidth || 0
      const scrollAmount = direction === "right" ? cardWidth + 16 : -(cardWidth + 16) // 16 for gap
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const startAutoScroll = () => {
    if (scrollContainerRef.current && !autoScrollIntervalRef.current) {
      autoScrollIntervalRef.current = setInterval(() => {
        if (scrollContainerRef.current) {
          const cardWidth = scrollContainerRef.current.querySelector(".deal-card")?.clientWidth || 0
          const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
          if (scrollContainerRef.current.scrollLeft >= maxScroll) {
            scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" })
          } else {
            scrollContainerRef.current.scrollBy({
              left: cardWidth + 16,
              behavior: "smooth",
            })
          }
        }
      }, 2000) // 3-second delay between scrolls
    }
  }

  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current)
      autoScrollIntervalRef.current = null
    }
  }

  useEffect(() => {
    startAutoScroll()
    return () => stopAutoScroll() // Cleanup on unmount
  }, [])

  return (
    <div className="space-y-4 mt-20 mx-4 sm:mx-8 md:mx-12 lg:mx-16">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Special Deals & Offers</h2>
        <div className="flex space-x-2">
          {/* <Button
            variant="outline"
            size="icon"
            onClick={() => {
              scroll("left")
              stopAutoScroll()
            }}
            onMouseEnter={stopAutoScroll}
            onMouseLeave={startAutoScroll}
            className="bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              scroll("right")
              stopAutoScroll()
            }}
            onMouseEnter={stopAutoScroll}
            onMouseLeave={startAutoScroll}
            className="bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" />
          </Button> */}
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            <Link href="/all-deals">
              <ExternalLink className="h-4 w-4 mr-1" />
              Show All
            </Link>
          </Button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-4 py-4"
        style={{ scrollBehavior: "smooth" }}
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
      >
        {deals.map((deal, index) => (
          <Card
            key={index}
            className="deal-card flex-none w-64 sm:w-72 md:w-80 snap-center bg-white shadow-md rounded-xl overflow-hidden transition-transform duration-300 hover:shadow-lg py-0 shadow-xl"
          >
            <div className="relative w-full h-40">
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 hover:bg-black/10"></div>
              <CardTitle className="absolute top-2 left-2 text-white text-sm font-semibold z-10">
                {deal.title}
              </CardTitle>
            </div>
            <CardContent className="p-4 space-y-3">
              <p className="text-xs text-gray-600 line-clamp-2">{deal.description}</p>
              <div className="flex justify-between">
                <Button
                  variant="default"
                  size="sm"
                  className=" text-white hover:bg-blue-700"
                >
                  Book Now
                </Button>
             
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
