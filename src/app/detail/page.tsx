// components/ListingPage.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Wifi, Lightbulb, PawPrint, Utensils } from "lucide-react";
import SpecialDeals from "@/components/SpecialDeals";

// --- 1. Header Component ---
function Header() {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold">
        8502 Preston Rd. Inglewood, Maine 98380
      </h1>
      <p className="text-sm text-gray-500 mt-1">Addis Ababa, Ethiopia</p>
      <div className="flex items-center text-sm mt-2">
        <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
        <span className="font-semibold">4.8</span>
        <span className="ml-1 text-gray-500">(44 reviews)</span>
      </div>
    </div>
  );
}

// --- 2. Image Gallery Component ---
function ImageGallery() {
  // Using sample images from Unsplash
  const images = [
    { src: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWx8ZW58MHx8MHx8fDI%3D", alt: "Main living area" },
    { src: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8fDI%3", alt: "Kitchen" },
    { src: "https://images.unsplash.com/photo-1445991842772-097fea258e7b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWx8ZW58MHx8MHx8fDI%3D", alt: "Bedroom" },
    { src: "https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Living room" },
    { src: "https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Detail shot" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8 rounded-lg overflow-hidden relative">
      <div className="col-span-2 row-span-2">
        <img
          src={images[0].src}
          alt={images[0].alt}
          className="w-full h-full object-cover"
        />
      </div>
      {images.slice(1, 5).map((image, index) => (
        <div key={index} className="relative aspect-video">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <div className="absolute bottom-4 right-4">
        <button className="bg-white/80 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm">
          See all photos (35)
        </button>
      </div>
    </div>
  );
}

// --- 3. Booking Sidebar Component ---
function BookingSidebar() {
  return (
    <Card className="sticky top-4">
      <CardHeader className="border-b p-4">
        <div className="flex justify-between items-baseline">
          <span className="text-2xl font-bold">620 ETB</span>
          <span className="text-gray-500">/night</span>
        </div>
        <p className="text-xs text-gray-500">Total before taxes</p>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <label className="text-xs font-semibold">Check-in</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  Jan 5, 2024
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label className="text-xs font-semibold">Check-out</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  Jan 25, 2024
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="mb-4">
          <label className="text-xs font-semibold">Guests</label>
          <Input value="4 Adults" readOnly />
        </div>
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Pricing Breakdown</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Rental price</span>
              <span>$4340</span>
            </div>
            <div className="flex justify-between">
              <span>5+ day discount</span>
              <span className="text-green-600">-$217</span>
            </div>
            <div className="flex justify-between">
              <span>Refundable deposit</span>
              <span>$500</span>
            </div>
          </div>
          <div className="border-t mt-4 pt-4 text-lg font-bold flex justify-between">
            <span>Total Price Due</span>
            <span>$12,280</span>
          </div>
        </div>
        <Button className="w-full mt-6">Continue to checkout</Button>
      </CardContent>
    </Card>
  );
}

// --- 4. Description and Features Component ---
function DescriptionAndFeatures() {
  const features = [
    { text: "1800sq. feet space", icon: <Wifi className="w-4 h-4" /> },
    { text: "Natural Lighting", icon: <Lightbulb className="w-4 h-4" /> },
    { text: "Pet Friendly", icon: <PawPrint className="w-4 h-4" /> },
    { text: "2.8 mi away from city", icon: <PawPrint className="w-4 h-4" /> },
    { text: "Cleaning Service", icon: <Utensils className="w-4 h-4" /> },
    { text: "Buffet Food", icon: <PawPrint className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Description</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">What this place offers?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              {feature.icon}
              <span className="ml-2">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- 5. Tabs and Map Section Component ---
function TabsAndMapSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <div>
        <Tabs defaultValue="reviews">
          <TabsList>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>
          <TabsContent value="reviews" className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Guest Reviews</h3>
            <p className="text-gray-600">Content for reviews goes here. This could be a list of user reviews with ratings and comments.</p>
          </TabsContent>
          <TabsContent value="policies" className="mt-4">
            <h3 className="text-xl font-semibold mb-2">House Policies</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Check-in time: 3:00 PM</li>
              <li>Check-out time: 11:00 AM</li>
              <li>No smoking</li>
              <li>No parties or events</li>
            </ul>
          </TabsContent>
          <TabsContent value="tips" className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Local Tips</h3>
            <p className="text-gray-600">Content for local tips, such as nearby restaurants and attractions, goes here.</p>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Location</h3>
        <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
          Map container placeholder
        </div>
      </div>
    </div>
  );
}

// --- Main Page Layout Component ---
export default function ListingPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Header />
          <ImageGallery />
          <DescriptionAndFeatures />
        </div>
        <div className="md:col-span-1">
          <BookingSidebar />
        </div>
      </div>
      <TabsAndMapSection />
      <SpecialDeals titel={"Related Offers"}/>
    </div>
  );
}