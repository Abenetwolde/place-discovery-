import { useEffect, useRef } from "react";
import maplibregl, { Map, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";


export function MapView() {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<Map | null>(null);
    useEffect(() => {
        if (map.current) return;
    
        if (mapContainer.current) {
          map.current = new maplibregl.Map({
            container: mapContainer.current,
            style:"https://demotiles.maplibre.org/style.json",
            // style: {
            //   version: 8,
            //   name: "Bright Minimal with Layers",
            //   sources: {
            //     openmaptiles: {
            //       type: "vector",
            //       tiles: ["https://map.ambalaymaps.com/ethiopia/{z}/{x}/{y}.mvt"],
            //       minzoom: 0,
            //       maxzoom: 5,
            //     },
            //   },
            //   layers: [
            //     {
            //       id: "background",
            //       type: "background",
            //       paint: { "background-color": "hsl(30, 36%, 96%)" },
            //     },
            //     {
            //       id: "land",
            //       type: "fill",
            //       source: "openmaptiles",
            //       "source-layer": "landuse",
            //       paint: { "fill-color": "#e0e0e0", "fill-opacity": 0.8 },
            //     },
            //     {
            //       id: "water",
            //       type: "fill",
            //       source: "openmaptiles",
            //       "source-layer": "water",
            //       paint: { "fill-color": "#a0c8f0", "fill-opacity": 1 },
            //     },
            //   ],
            // },
            center: [40.5, 9.2], // Ethiopia center as default
            zoom: 6,
            attributionControl: {
              compact: false,
              customAttribution: "© OpenMapTiles © OpenStreetMap contributors",
            },
          });
    
          map.current.addControl(new maplibregl.NavigationControl());
    
          // Add current location marker
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                const marker = new maplibregl.Marker({ color: "red" })
                  .setLngLat([longitude, latitude])
                  .setPopup(new maplibregl.Popup().setHTML("<h3>Your Location</h3>"))
                  .addTo(map.current!);
    
                // Fly to current location
                map.current!.flyTo({
                  center: [longitude, latitude],
                  zoom: 4,
                  duration: 2000,
                });
              },
              (error) => {
                console.error("Error getting location:", error);
              },
              { enableHighAccuracy: true }
            );
          }
    
          // Add dynamic layers after map loads
          map.current.on("load", () => {
            console.log("Map loaded, adding dynamic layers");
    
            try {
              map.current?.addLayer({
                id: "parks",
                type: "fill",
                source: "openmaptiles",
                "source-layer": "park",
                paint: { "fill-color": "green", "fill-opacity": 0.6 },
              });
              console.log("Parks layer added successfully");
            } catch (error) {
              console.error("Error adding parks layer:", error);
            }
    
            try {
              map.current?.addLayer({
                id: "roads",
                type: "line",
                source: "openmaptiles",
                "source-layer": "transportation",
                paint: { "line-color": "blue", "line-width": 2 },
                filter: ["==", "class", "motorway"],
              });
              console.log("Roads layer added successfully");
            } catch (error) {
              console.error("Error adding roads layer:", error);
            }
    
            try {
              map.current?.addLayer({
                id: "city-labels",
                type: "symbol",
                source: "openmaptiles",
                "source-layer": "place",
                paint: { "text-color": "black", "text-halo-color": "white", "text-halo-width": 1 },
                layout: { "text-field": "{name}", "text-size": 14, visibility: "visible" },
                filter: ["==", "class", "city"],
              });
              console.log("City labels layer added successfully");
            } catch (error) {
              console.error("Error adding city labels:", error);
            }
          });
    
          map.current.on("error", (e) => {
            console.error("Map load error:", e.error);
          });
        }
    
        return () => {
          if (map.current) {
            map.current.remove();
            map.current = null;
          }
        };
      }, []);

  return (
    <div className="w-full h-full">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}