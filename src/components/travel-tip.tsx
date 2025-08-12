"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, Clock, Shield, Camera, Utensils, Car, ChevronRight } from "lucide-react"

interface TravelTip {
  id: number
  category: string
  title: string
  content: string
  icon: React.ReactNode
  priority: "high" | "medium" | "low"
}

export default function TravelTips() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const tips: TravelTip[] = [
    {
      id: 1,
      category: "safety",
      title: "Altitude Awareness",
      content: "Addis Ababa is at 2,400m elevation. Take it easy on your first day and stay hydrated.",
      icon: <Shield className="h-4 w-4" />,
      priority: "high",
    },
    {
      id: 2,
      category: "culture",
      title: "Coffee Ceremony Etiquette",
      content: "When invited to a coffee ceremony, it's polite to accept all three rounds: Abol, Tona, and Baraka.",
      icon: <Utensils className="h-4 w-4" />,
      priority: "medium",
    },
    {
      id: 3,
      category: "photography",
      title: "Ask Before Photographing",
      content: "Always ask permission before photographing people, especially in rural areas and religious sites.",
      icon: <Camera className="h-4 w-4" />,
      priority: "high",
    },
    {
      id: 4,
      category: "transport",
      title: "Best Travel Times",
      content: "Dry season (October-May) is ideal for travel. Roads can be challenging during rainy season.",
      icon: <Car className="h-4 w-4" />,
      priority: "medium",
    },
    {
      id: 5,
      category: "culture",
      title: "Ethiopian Calendar",
      content:
        "Ethiopia follows a unique calendar with 13 months. They're about 7-8 years behind the Gregorian calendar.",
      icon: <Clock className="h-4 w-4" />,
      priority: "low",
    },
    {
      id: 6,
      category: "safety",
      title: "Health Precautions",
      content: "Yellow fever vaccination required. Consider malaria prophylaxis for lowland areas.",
      icon: <Shield className="h-4 w-4" />,
      priority: "high",
    },
  ]

  const categories = [
    { id: "all", name: "All Tips", count: tips.length },
    { id: "safety", name: "Safety", count: tips.filter((t) => t.category === "safety").length },
    { id: "culture", name: "Culture", count: tips.filter((t) => t.category === "culture").length },
    { id: "photography", name: "Photography", count: tips.filter((t) => t.category === "photography").length },
    { id: "transport", name: "Transport", count: tips.filter((t) => t.category === "transport").length },
  ]

  const filteredTips = selectedCategory === "all" ? tips : tips.filter((tip) => tip.category === selectedCategory)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="mt-20">
      <CardHeader>
        <CardTitle className="text-sm flex items-center space-x-2">
          <Lightbulb className="h-4 w-4" />
          <span>Travel Tips</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-1">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="text-xs h-7"
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Tips List */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {filteredTips.map((tip) => (
            <div key={tip.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">{tip.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm truncate">{tip.title}</h4>
                    <Badge className={`text-xs ${getPriorityColor(tip.priority)}`}>{tip.priority}</Badge>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{tip.content}</p>
                </div>
                <ChevronRight className="h-3 w-3 text-gray-400 flex-shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>

        {filteredTips.length === 0 && (
          <div className="text-center py-4 text-sm text-gray-500">No tips found for this category.</div>
        )}

        <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
          View All Travel Tips
        </Button>
      </CardContent>
    </Card>
  )
}
