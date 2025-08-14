"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { MapView } from "./MapView";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from 'next/image';
import { Star, MapPin, Phone, Clock, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// import { getStaticMapUrl, Service } from "./services/map-utils";
import ServiceCard from "./services/service-card";
import TabsSection from "./services/tabs-section";
import SheetContentDisplay from "./services/sheet-content";
import { getStaticMapUrl, Service } from "@/lib/map-utils";
import Link from "next/link";

export function ServicesSection() {
  const mapUrl = getStaticMapUrl({
    size: "600x400",
    zoom: 14,
    markers: "color:red|label:A|9.03,38.74",
    path: "color:0x0000ff|weight:5|9.03,38.74|9.04,38.75|9.05,38.76",
  });
  console.log("Map URL:", mapUrl);
// You can move this data outside the component if it's used elsewhere
const hardcodedService = {
  id: "1",
  title: "The Grand Hyatt",
  description: "A luxury hotel in the heart of the city, offering breathtaking views and world-class amenities. Perfect for a business trip or a relaxing getaway.",
  image: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWx8ZW58MHx8MHx8fDI%3D",
  rating: 4.9,
  reviews: 1250,
  location: "123 Main Street, New York, NY",
  hours: "Open 24 hours",
  phone: "(212) 555-1234",
  tags: ["Luxury", "5-Star", "Rooftop Pool", "Restaurant"],
};

interface ServiceSheetDisplayProps {
  // We'll change the prop to just take the data directly
  // or you could keep the `service` prop and just pass the hardcoded data
  service: typeof hardcodedService | null;
}

  const services: Service[] = [
    {
      title: "Service 1",
      description: "Lorem ipsum is simply dummy text.",
      image: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWx8ZW58MHx8MHx8fDI%3D",
      currentDateTime: "32",
      distance: "12km",
      rating: 4.5,
      tags: ["Hotel", "Luxury", "City"],
    },
    {
      title: "Service 2",
      description: "Lorem ipsum is simply dummy text of the printing industry.",
      image: "https://images.unsplash.com/photo-1754799399805-da0178249638?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.0,
      tags: ["Food", "Restaurant", "Local"],
    },
    {
      title: "Service 3",
      description: "Lorem ipsum is simply dummy text of the printing industry.",
      image: "https://images.unsplash.com/photo-1754772512355-299e9c2b1b76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
      rating: 4.8,
      tags: ["Travel", "Tour", "Adventure"],
    },
  ];
function ServiceSheetDisplay({ service }: ServiceSheetDisplayProps) {
  if (!service) {
    return null;
  }

  return (
    <div className="flex flex-col h-full p-5">
      <div className="flex-grow overflow-y-auto pr-4">
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
          <Image
            src={hardcodedService.image}
             alt={hardcodedService.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        <div className="p-1">
          <h2 className="text-2xl font-bold mb-1">{service.title}</h2>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
            <span className="font-semibold">{service.rating}</span>
            <span className="ml-1">({service.reviews} reviews)</span>
          </div>

          <div className="space-y-3 mb-6">
            <p className="text-sm text-gray-700">{service.description}</p>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <span>{service.location||"jdqwhg"}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2 text-gray-400" />
              <span>{service.phone||"0923232323"}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2 text-gray-400" />
              <span>{service.hours||"11:50AM"}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {service.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-2">More Information</h3>
          <p className="text-sm text-gray-700">
            A longer, more detailed description of the service and its offerings.
            This could include menu items, travel packages, event schedules, etc.
          </p>
        </div>
      </div>
    </div>
  );
}

  const [selectedTab, setSelectedTab] = useState<string>("Hotel");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleCardClick = (service: Service) => {
    setSelectedService(service);
  };

  return (
    <section>
      <div className="flex item-center justify-between">
      <h2 className="text-2xl font-bold mb-6">Services around you</h2>
      <div className="min-h-12 ">
      <button
        className={cn(
          "group flex h-12  items-center justify-center gap-3 rounded-lg bg-gray-200 p-2 font-bold transition-colors duration-100 ease-in-out hover:bg-black",
        )}
      >
        <span
          className={cn(
            "text-black transition-colors duration-100 ease-in-out group-hover:text-gray-200",
          )}
        >
          Offline Mode
        </span>
        <div
          className={cn(
            "relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full transition-transform duration-100",
            "bg-black group-hover:bg-gray-200",
          )}
        >
          <div className="absolute left-0 flex h-7 w-14 -translate-x-1/2 items-center justify-center transition-all duration-200 ease-in-out group-hover:translate-x-0">
            <Download
              size={16}
              className={cn(
                "size-7 transform p-1 text-black opacity-0 group-hover:opacity-100",
              )}
            />
            <Download
              size={16}
              className={cn(
                "size-7 transform p-1 text-gray-200 opacity-100 transition-transform duration-300 ease-in-out group-hover:opacity-0",
              )}
            />
          </div>
        </div>
      </button>
    </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-6">
        <div className="space-y-6 ">
          <TabsSection
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            tabs={["Hotel", "Food", "Travel", "Events"]}
          />
          {services
            .filter((service) => {
              const categoryMap: { [key: string]: string } = {
                Hotel: "Service 1",
                Food: "Service 2",
                Travel: "Service 3",
                Events: "Service 1",
              };
              return service.title === categoryMap[selectedTab];
            })
            .map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                selectedService={selectedService}
                onClick={handleCardClick}
              />
            ))}
        </div>
        <div className="h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden relative">
          <MapView />
          <Sheet open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
        <SheetContent side="right" className="flex flex-col w-[400px] sm:w-[540px]">
          <div className="flex-grow overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Service Details</SheetTitle>
              <SheetDescription>
                Details about the selected service, its offerings, and location.
              </SheetDescription>
            </SheetHeader>
            
            {/* Pass the hardcoded data directly to the component */}
            <ServiceSheetDisplay service={selectedService} />
          </div>

          <div className="mt-auto p-4 border-t">
            <Button
              variant="default"
              size="lg"
              className="w-full mb-2"
              asChild
            >
              <Link href={`/detail`}>
                View More Details
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => setSelectedService(null)}
            >
              Close
            </Button>
          </div>
        </SheetContent>
      </Sheet>
        </div>
      </div>
    </section>
  );
}