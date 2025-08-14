// src/components/AdCarousel.tsx
"use client";

import { useState, useEffect } from "react";
import { CardContent } from "@/components/ui/card";

// Dummy ad images
const adImages = [
  "https://images.unsplash.com/photo-1696299872422-0f72e707a037?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9udW1uZXRzJTIwZXRoaW9waWF8ZW58MHx8MHx8fDI%3D",
  "https://plus.unsplash.com/premium_photo-1754738812928-d7f23344b956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D",
 
];

export function AdCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % adImages.length);
    }, 3000); // Auto-scroll every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
<div className="relative h-full">
      {/* Carousel Images */}
      {adImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          {/* Transparent black overlay */}
          <div className="absolute inset-0 bg-black/30" />
          <h3 className="absolute top-4 left-4 text-lg font-semibold text-white z-10">
            Sponsored Ad
          </h3>
        </div>
      ))}

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {adImages.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}