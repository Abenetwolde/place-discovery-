import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

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

export function ServicesSection() {
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
        <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-muted-foreground">
          {/* Placeholder for map */}
          Map Viewhhh
        </div>
      </div>
    </section>
  );
}