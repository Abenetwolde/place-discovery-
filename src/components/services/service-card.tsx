"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Service } from "@/lib/map-utils";


interface ServiceCardProps {
  service: Service;
  selectedService: Service | null;
  onClick: (service: Service) => void;
}

export default function ServiceCard({ service, selectedService, onClick }: ServiceCardProps) {
  return (
    <Card
      className={cn(
        "grid grid-cols-[30%_70%] gap-2 items-center overflow-hidden py-0 cursor-pointer",
        selectedService?.title === service.title && "border-2 border-indigo-500"
      )}
      onClick={() => onClick(service)}
    >
      <div className="h-full w-full bg-blue-300 overflow-hidden">
        <img
          src={service.image || "https://plus.unsplash.com/premium_photo-1752521131899-ffc4b14543ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"}
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-1 p-2">
        <CardHeader>
          <CardTitle>{service.title}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          <p className="text-sm text-gray-600">{service.description}</p>
          {service.distance && <p className="text-sm text-gray-500">Distance: {service.distance} km</p>}
          {service.currentDateTime && <p className="text-xs text-gray-400">Weather: {service.currentDateTime}</p>}
          {service.rating && (
            <div className="flex items-center text-sm text-yellow-500">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className={cn("h-4 w-4", i < Math.floor(service?.rating) ? "fill-current" : "")} />
              ))}
              <span className="ml-1 text-gray-600">{service.rating}/5</span>
            </div>
          )}
          {service.tags && (
            <div className="flex flex-wrap gap-1">
              {service.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}