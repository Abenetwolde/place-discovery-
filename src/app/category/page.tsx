// app/page.tsx

"use client";

import { Star, Heart, MapPin, ChevronDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data for the services with working images and descriptions
const services = [
  { 
    id: 1, 
    name: "Mystic Peaks Lodge", 
    rating: 4.8, 
    description: "A cozy lodge with breathtaking views of the mountains.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: 2, 
    name: "Summit Adventures", 
    rating: 4.5, 
    description: "Guided tours and hiking trips for all experience levels.",
    image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: 3, 
    name: "Alpine Retreats", 
    rating: 4.9, 
    description: "Luxury cabins and spa services nestled in the forest.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: 4, 
    name: "Forest Trails Inn", 
    rating: 4.2, 
    description: "A quiet inn perfect for escaping the city life.",
    image: "https://images.unsplash.com/photo-1551632811-552719904724?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: 5, 
    name: "Cloud Nine Rentals", 
    rating: 4.7, 
    description: "Equipment rentals for skiing, snowboarding, and hiking.",
    image: "https://images.unsplash.com/photo-1616857973946-444a80ce6d06?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: 6, 
    name: "The Gilded Peak", 
    rating: 4.5, 
    description: "A high-end restaurant with a menu inspired by the wilderness.",
    image: "https://images.unsplash.com/photo-1533035353720-f17377196239?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: 7, 
    name: "Mountain Sky Glamping", 
    rating: 4.9, 
    description: "Luxurious glamping with clear tents for stargazing.",
    image: "https://images.unsplash.com/photo-1596436889106-be35e84e6f9b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: 8, 
    name: "The Trailhead Pub", 
    rating: 4.6, 
    description: "A friendly pub with local craft beers and hearty food.",
    image: "https://images.unsplash.com/photo-1510364402634-b2585f98a28e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-800">
      
      {/* Main Content */}
      <main className="flex-1">
        {/* Category Hero Image with title */}
        <div 
          className="relative h-64 bg-cover bg-center" 
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519681393784-d120267933ba)' }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <h1 className="text-4xl font-extrabold text-white">Mountains</h1>
          </div>
        </div>

        <div className="container mx-auto p-4 md:p-8">
          
          {/* Main Layout: Sidebar and Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
            
            {/* Sidebar with Filtering Options */}
            <aside className="space-y-6">
              <h2 className="text-lg font-bold">Filters</h2>

              {/* Price Range Filter */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center justify-between text-base font-medium">
                  Price Range
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                </CollapsibleTrigger>
                <CollapsibleContent className="py-4 px-2">
                  <Slider 
                    defaultValue={[20, 80]}
                    max={100}
                    step={1}
                    className="w-[90%]"
                  />
                  <div className="mt-2 text-sm text-gray-500 flex justify-between">
                    <span>$0</span>
                    <span>$1000+</span>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Ratings Filter */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center justify-between text-base font-medium">
                  Ratings
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                </CollapsibleTrigger>
                <CollapsibleContent className="py-4 px-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rating-4" />
                    <label htmlFor="rating-4" className="text-sm">4 Stars & Up</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rating-3" />
                    <label htmlFor="rating-3" className="text-sm">3 Stars & Up</label>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Location Filter */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center justify-between text-base font-medium">
                  Location
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                </CollapsibleTrigger>
                <CollapsibleContent className="py-4 px-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alps">The Alps</SelectItem>
                      <SelectItem value="rockies">The Rockies</SelectItem>
                      <SelectItem value="himalayas">The Himalayas</SelectItem>
                    </SelectContent>
                  </Select>
                </CollapsibleContent>
              </Collapsible>
            </aside>
            
            {/* Main Content Area */}
            <div className="flex-1">
              {/* Secondary Filter Bar with Map Toggle */}
              <div className="mb-8 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="flex space-x-2">
                  <Button variant="ghost">Sort by</Button>
                  <Button variant="ghost">Price Range</Button>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant={"default"}
                        className="w-full gap-2 sm:w-auto"
                      >
                        <MapPin className="h-4 w-4 animate-pulse-color" />
                        <span>Show on Map</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View all results on a map</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {/* Result Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {services.map((service) => (
                  <Card key={service.id} className="overflow-hidden shadow-sm transition-transform hover:scale-[1.02] py-0">
                    <img src={service.image} alt={service.name} className="h-40 w-full object-cover" />
                    <CardContent className="space-y-3 p-4">
                      <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(service.rating) ? "fill-current text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span>{service.rating}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500 transition-colors">
                          <Heart className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Button className="flex-1">View</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}