"use client";

import { SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Service } from "@/lib/map-utils";

interface SheetContentDisplayProps {
  service: Service | null;
}

export default function SheetContentDisplay({ service }: SheetContentDisplayProps) {
  return (
    <>
      <SheetHeader>
        <SheetTitle>{service?.title}</SheetTitle>
        <SheetDescription>
          Sample message: Thank you for selecting this service! Please contact us for more details at 01:32 PM EAT on Wednesday, August 13, 2025.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <p className="text-sm text-gray-600">{service?.description}</p>
        {service?.distance && <p className="text-sm text-gray-500">Distance: {service.distance} km</p>}
        {service?.currentDateTime && <p className="text-xs text-gray-400">Weather: {service.currentDateTime}</p>}
        {service?.rating && (
          <div className="flex items-center text-sm text-yellow-500">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className={cn("h-4 w-4", i < Math.floor(service?.rating) ? "fill-current" : "")} />
            ))}
            <span className="ml-1 text-gray-600">{service.rating}/5</span>
          </div>
        )}
        {service?.tags && (
          <div className="flex flex-wrap gap-1">
            {service.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}