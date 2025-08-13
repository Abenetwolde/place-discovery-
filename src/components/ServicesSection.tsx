"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
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

// import { getStaticMapUrl, Service } from "./services/map-utils";
import ServiceCard from "./services/service-card";
import TabsSection from "./services/tabs-section";
import SheetContentDisplay from "./services/sheet-content";
import { getStaticMapUrl, Service } from "@/lib/map-utils";

export function ServicesSection() {
  const mapUrl = getStaticMapUrl({
    size: "600x400",
    zoom: 14,
    markers: "color:red|label:A|9.03,38.74",
    path: "color:0x0000ff|weight:5|9.03,38.74|9.04,38.75|9.05,38.76",
  });
  console.log("Map URL:", mapUrl);

  const services: Service[] = [
    {
      title: "Service 1",
      description: "Lorem ipsum is simply dummy text.",
      image: "https://plus.unsplash.com/premium_photo-1754728140366-a4a8c8cfb266?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzN3x8fGVufDB8fHx8fA%3D%3D",
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

  const [selectedTab, setSelectedTab] = useState<string>("Hotel");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleCardClick = (service: Service) => {
    setSelectedService(service);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Services around you</h2>
      <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-6">
        <div className="space-y-6">
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
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <SheetContentDisplay service={selectedService} />
              <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => setSelectedService(null)}>
                Close
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
}