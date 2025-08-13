"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, Clock, Shield, Camera, Utensils, Car, ChevronRight } from "lucide-react"
// TravelTips Component
interface TravelTip {
    id: number;
    category: string;
    title: string;
    content: string;
    icon: React.ReactNode;
    priority: "high" | "medium" | "low";
  }
  
  const TravelTips: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
    const tips: TravelTip[] = [
      {
        id: 1,
        category: "safety",
        title: "Altitude Awareness",
        content: "Addis Ababa is at 2,400m elevation. Take it easy on your first day and stay hydrated.",
        icon: <Shield className="h-5 w-5 text-indigo-600" />,
        priority: "high",
      },
      {
        id: 2,
        category: "culture",
        title: "Coffee Ceremony Etiquette",
        content: "When invited to a coffee ceremony, it's polite to accept all three rounds: Abol, Tona, and Baraka.",
        icon: <Utensils className="h-5 w-5 text-indigo-600" />,
        priority: "medium",
      },
      {
        id: 3,
        category: "photography",
        title: "Ask Before Photographing",
        content: "Always ask permission before photographing people, especially in rural areas and religious sites.",
        icon: <Camera className="h-5 w-5 text-indigo-600" />,
        priority: "high",
      },
      {
        id: 4,
        category: "transport",
        title: "Best Travel Times",
        content: "Dry season (October-May) is ideal for travel. Roads can be challenging during rainy season.",
        icon: <Car className="h-5 w-5 text-indigo-600" />,
        priority: "medium",
      },
      {
        id: 5,
        category: "culture",
        title: "Ethiopian Calendar",
        content: "Ethiopia follows a unique calendar with 13 months. They're about 7-8 years behind the Gregorian calendar.",
        icon: <Clock className="h-5 w-5 text-indigo-600" />,
        priority: "low",
      },
      {
        id: 6,
        category: "safety",
        title: "Health Precautions",
        content: "Yellow fever vaccination required. Consider malaria prophylaxis for lowland areas.",
        icon: <Shield className="h-5 w-5 text-indigo-600" />,
        priority: "high",
      },
    ];
  
    const categories = [
      { id: "all", name: "All Tips", count: tips.length },
      { id: "safety", name: "Safety", count: tips.filter((t) => t.category === "safety").length },
      { id: "culture", name: "Culture", count: tips.filter((t) => t.category === "culture").length },
      { id: "photography", name: "Photography", count: tips.filter((t) => t.category === "photography").length },
      { id: "transport", name: "Transport", count: tips.filter((t) => t.category === "transport").length },
    ];
  
    const filteredTips = selectedCategory === "all" ? tips : tips.filter((tip) => tip.category === selectedCategory);
  
    const getPriorityColor = (priority: string): string => {
      switch (priority) {
        case "high":
          return "bg-red-100 text-red-800";
        case "medium":
          return "bg-yellow-100 text-yellow-800";
        case "low":
          return "bg-green-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };
  
    return (
      <div className="w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-6 transition-all duration-300 hover:shadow-3xl">
        <div className="flex items-center space-x-2 mb-6">
          <Lightbulb className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-800">Travel Tips</h2>
        </div>
  
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-indigo-100 hover:text-indigo-600"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
  
          {/* Tips List */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {filteredTips.map((tip) => (
              <div
                key={tip.id}
                className="border border-gray-200 rounded-lg p-4 bg-white hover:bg-gray-50 transition-all duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">{tip.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm text-gray-800 truncate">{tip.title}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(tip.priority)}`}>
                        {tip.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{tip.content}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                </div>
              </div>
            ))}
          </div>
  
          {filteredTips.length === 0 && (
            <div className="text-center py-4 text-sm text-gray-500">No tips found for this category.</div>
          )}
  
          <button
            className="w-full py-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 text-sm font-medium transition-all duration-200"
          >
            View All Travel Tips
          </button>
        </div>
      </div>
    );
  };
  export default TravelTips