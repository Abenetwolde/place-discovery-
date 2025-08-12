
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "./ui/button"

export function SpecialDeals() {
  const deals = [
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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Special Deals & Offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {deals.map((deal, index) => (
          <Card key={index} className="flex flex-col overflow-hidden py-0">
            <div className="relative w-full h-52">
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-transparent"></div>
              <CardTitle className="absolute top-2 left-2 text-white text-sm z-10">
                {deal.title}
              </CardTitle>
            </div>
            <CardContent className="flex-grow p-4 space-y-2">
              <p className="text-xs text-gray-600">{deal.description}</p>
              <div className="flex justify-between">
                <Button variant="default" size="sm">
                  Book Now
                </Button>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
