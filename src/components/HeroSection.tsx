'use client';
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { AdCarousel } from "@/components/AdCarousel";
import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import StaggeredLetter from "./Hero/StaggeredLetter";
import Expandable from "./Hero/Ads/carousel";
import SearchBar from "./Hero/SearchBar";
import { useRouter } from "next/navigation";
// Dummy location data (simulate map services API)
const locations = [
    { value: "new-york", label: "New York" },
    { value: "london", label: "London" },
    { value: "tokyo", label: "Tokyo" },
    { value: "paris", label: "Paris" },
    { value: "sydney", label: "Sydney" },
];

// Dummy category data for left cards
const categories = [
    { title: "Hiritage Sites", image: "https://images.unsplash.com/photo-1653537877655-26bc13c83976?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vbnVtbmV0cyUyMGV0aGlvcGlhfGVufDB8fDB8fHwy" },
    { title: "Natural Wonder", image: "https://images.unsplash.com/photo-1632309802733-ddf63a8f4955?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Cultural Site", image: "https://images.unsplash.com/photo-1696299872422-0f72e707a037?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9udW1uZXRzJTIwZXRoaW9waWF8ZW58MHx8MHx8fDI%3D" },
];

export function HeroSection() {
    const [selectedLocation, setSelectedLocation] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
 const router = useRouter()
    // Filter locations based on search term
    const filteredLocations = locations.filter((loc) =>
        loc.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleCategoriesClick = () => {
        // console.log(`Clicked on category: ${category}`);
        // Navigate to the category page or perform any action
        router.push(`/category`);
    }
    return (
        <section className="py-8 bg-background">
            <div className="container mx-auto px-4">
                {/* First main component: Hero text only */}
                <div className="mb-4">
                  <StaggeredLetter/>
                    {/* <h1 className="text-3xl md:text-4xl text-center mb-5 font-bold text-foreground">
                        Discover Amazing Places
                    </h1> */}
                </div>

                {/* Second main component: Row with two text fields */}
                <SearchBar locations={[]} onLocationSelect={function (location: string): void {
            throw new Error("Function not implemented.");
          } }/>
 

                {/* Third main component: Row with left (3 cards in row) and right (carousel ad) */}
          {/* Third main component: Row with left (3 cards in row) and right (carousel ad) */}
    {/* Third main component: Row with left (3 cards in row) and right (carousel ad) */}
        <div className="flex flex-col lg:flex-row gap-6 h-48 lg:h-64">
          {/* Left section: 60% width, 3 cards in row */}
          <div className="w-full lg:w-3/5 h-full">
            <div className="flex gap-6 overflow-x-hidden h-full">
              {categories.map((category, index) => (
                <Card
                onClick={() => handleCategoriesClick()  }
                  key={index}
                  className="relative overflow-hidden flex-1 h-full cursor-pointer hover:shadow-lg transition-shadow"
                  style={{ backgroundImage: `url(${category.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                >
                  {/* Transparent gradient overlay darker at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <h3 className="absolute bottom-3 left-3 text-l font-semibold text-white z-10">
                    {category.title}
                  </h3>
                  <ChevronRight className="absolute bottom-3 right-3 text-white h-8 w-8 z-10" />
                </Card>
              ))}
            </div>
          </div>

          {/* Right section: 40% width, single card with carousel ad */}
          <div className="w-full lg:w-2/5 h-full">
            <Card className="py-0 overflow-hidden h-full">
              {/* <AdCarousel /> */}
              <Expandable/>
            </Card>
          </div>
        </div>
      </div>
    </section>
    );
}