"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

interface Service {
  id: number
  name: string
  type: string
  coordinates: { lat: number; lng: number }
}

interface Location {
  lat: number
  lng: number
}

export function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null)

  // Fetch services around current location using Overpass API
  const fetchServices = async (lat: number, lng: number) => {
    const radius = 1000 // 1km radius
    const query = `
      [out:json];
      (
        node(around:${radius},${lat},${lng})["amenity"~"marketplace|hospital|school|restaurant"];
      );
      out body;
    `
    try {
      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      })
      const data = await response.json()
      const fetchedServices: Service[] = data.elements.map((element: any, index: number) => ({
        id: index + 1,
        name: element.tags.name || element.tags.amenity || `Unnamed ${element.tags.amenity}`,
        type: element.tags.amenity,
        coordinates: { lat: element.lat, lng: element.lon },
      }))

      // Add service markers
      fetchedServices.forEach((service) => {
        new maplibregl.Marker({ color: "blue" })
          .setLngLat([service.coordinates.lng, service.coordinates.lat])
          .setPopup(
            new maplibregl.Popup().setHTML(
              `<h3>${service.name}</h3><p>Type: ${service.type}</p>`
            )
          )
          .addTo(map.current!)
      })
    } catch (error) {
      console.error("Error fetching services:", error)
    }
  }

  useEffect(() => {
    if (map.current) return

    if (mapContainer.current) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            ethiopia: {
              type: "vector",
              tiles: ["https://map.ambalaymaps.com/ethiopia/ethiopia/{z}/{x}/{y}.mvt"],
              minzoom: 0,
              maxzoom: 14,
            },
          },
          layers: [
            {
              id: "background",
              type: "background",
              paint: { "background-color": "#f8f8f8" },
            },
            {
              id: "water",
              type: "fill",
              source: "ethiopia",
              "source-layer": "water",
              paint: { "fill-color": "#a0c8f0" },
            },
            {
              id: "roads",
              type: "line",
              source: "ethiopia",
              "source-layer": "transportation",
              filter: ["==", "class", "motorway"],
              paint: { "line-color": "#ff9900", "line-width": 2 },
            },
          ],
        },
        center: [40.5, 9.2], // Default center
        zoom: 6,
        attributionControl: {
          compact: false,
          customAttribution: "© OpenMapTiles © OpenStreetMap contributors",
        },
      })

      map.current.addControl(new maplibregl.NavigationControl(), "bottom-right")

      // Get current location and add red marker
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords
            setCurrentLocation({ lat: latitude, lng: longitude })

            // Add red location marker
            new maplibregl.Marker({ color: "red" })
              .setLngLat([longitude, latitude])
              .setPopup(new maplibregl.Popup().setHTML("<h3>Your Location</h3>"))
              .addTo(map.current!)

            // Fly to current location
            map.current!.flyTo({
              center: [longitude, latitude],
              zoom: 14,
              duration: 2000,
            })

            // Fetch and add services
            await fetchServices(latitude, longitude)
          },
          (error) => {
            console.error("Error getting location:", error)
          },
          { enableHighAccuracy: true }
        )
      }
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  const handleZoom = (direction: "in" | "out") => {
    if (map.current) {
      if (direction === "in") {
        map.current.zoomIn()
      } else {
        map.current.zoomOut()
      }
    }
  }

  const handleReset = () => {
    if (map.current && currentLocation) {
      map.current.flyTo({
        center: [currentLocation.lng, currentLocation.lat],
        zoom: 14,
        duration: 2000,
      })
    }
  }

  return (
    <div className="w-full h-full relative">
      {/* Map Display */}
      <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
  
        <Button size="sm" variant="outline" onClick={handleReset}>
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
      <div className="relative h-full rounded-lg overflow-hidden">
        <div ref={mapContainer} className="w-full h-full" />
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg z-10">
          <h4 className="font-medium text-sm mb-2">Legend</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Your Location</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Services</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}