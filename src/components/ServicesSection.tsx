import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
    import Image from 'next/image';

// Inside the map div

const services = [
  {
    title: "Service 1",
    description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "https://plus.unsplash.com/premium_photo-1754728140366-a4a8c8cfb266?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzN3x8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Service 2",
    description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "https://images.unsplash.com/photo-1754799399805-da0178249638?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Service 3",
    description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: "https://images.unsplash.com/photo-1754772512355-299e9c2b1b76?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
  },
];
function getStaticMapUrl(options:any) {
  const apiKey = 'sam_sam_FSUP9N1D50qTgg1mMUODH61sRHKhE8jg';
  const baseUrl = 'https://api.ambalaymaps.com/v1/staticmap';

  // Default options
  const defaultOptions = {
    center: '9.03,38.74', // Addis Ababa coordinates
    zoom: 12,
    size: '600x400',
    maptype: 'roadmap',
  };

  // Merge options
  const mergedOptions = { ...defaultOptions, ...options, key: apiKey };

  // Build query string
  const queryParams = Object.entries(mergedOptions)
    .map(([key, value]:any) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return `${baseUrl}?${queryParams}`;
}
export function ServicesSection() {
    const mapUrl = getStaticMapUrl({
    size: '600x400',
    zoom: 14,
    markers: 'color:red|label:A|9.03,38.74',
    path: 'color:0x0000ff|weight:5|9.03,38.74|9.04,38.75|9.05,38.76',
  });
  console.log("Map URL:", mapUrl);
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Services around you</h2>
      {/* Category Buttons */}
      <div className="mb-6 flex space-x-1 overflow-x-auto pb-2">
        <Button size={"lg"} variant="default">Hotel</Button>
        <Button size={"lg"} variant="outline">Food</Button>
        <Button size={"lg"} variant="outline">Travel</Button>
        <Button size={"lg"} variant="outline">Events</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="space-y-6">
  {services?.map((service, index) => (
    <Card key={index} className="flex animate-fade-in h-48">
      <div className=" w-1/2 bg-blue-300 flex items-center justify-center overflow-hidden relative">
        <img
          src={service.image}
          alt={service.title}
          className="w-full bg-red-400 h-full object-cover absolute top-0 left-0"
      
        />
        {/* Debug overlay to check container size */}
        {/* <div className="absolute inset-0 bg-black/10 pointer-events-none flex items-center justify-center text-white text-xs">
          {`${Math.round(200 * index)}x${Math.round(48 * index)}`}
        </div> */}
      </div>
      <div className="w-1/2 p-4 flex-1 flex flex-col justify-between">
        <CardHeader>
          <CardTitle>{service.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <CardDescription>{service.description}</CardDescription>
        </CardContent>
      </div>
    </Card>
  ))}
</div>
         <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden flex items-center justify-center text-muted-foreground">

<Image src={"https://api.ambalaymaps.com/v1/staticmap?center=9.03,38.74&zoom=12&size=600x400&markers=color:red|9.03,38.74&key=sam_sam_FSUP9N1D50qTgg1mMUODH61sRHKhE8jg"}alt="Map of Addis Ababa with marker"  width={600} height={400} className="object-cover" />
        </div>
      </div>
    </section>
  );
}