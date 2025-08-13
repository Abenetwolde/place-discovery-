"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import {
  Bed,
  MapPin,
  Star,
  CalendarIcon,
  Users,
  Phone,
  Mail,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Wifi,
  Car,
  Coffee,
  Mountain,
  Camera,
  Shield,
  Book,
} from "lucide-react"
import { format } from "date-fns"

interface BookingItem {
  id: number
  name: string
  type: "hotel" | "tour" | "guide" | "transport"
  location: string
  rating: number
  price: number
  currency: string
  duration?: string
  capacity?: number
  images: string[]
  amenities: string[]
  description: string
  provider: {
    name: string
    phone: string
    email: string
    verified: boolean
  }
  availability: {
    available: boolean
    nextAvailable?: string
  }
  cancellationPolicy: string
  includes: string[]
  excludes: string[]
}

interface BookingSystemProps {
  location?: string
  attractionId?: number
}

export default function BookingSystem({ location = "Lalibela", attractionId }: BookingSystemProps) {
  const [selectedType, setSelectedType] = useState<string>("all")
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState(2)
  const [selectedItem, setSelectedItem] = useState<BookingItem | string | null>(null)
  const [bookingStep, setBookingStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "card",
  })

  const bookingItems: BookingItem[] = [
    {
      id: 1,
      name: "Lalibela Hotel",
      type: "hotel",
      location: "Lalibela",
      rating: 4.2,
      price: 85,
      currency: "USD",
      capacity: 4,
      images: ["/placeholder.svg?height=200&width=300&text=Lalibela+Hotel"],
      amenities: ["WiFi", "Restaurant", "Airport Transfer", "24/7 Reception"],
      description:
        "Traditional Ethiopian hotel with modern amenities, located 5 minutes walk from the famous rock churches.",
      provider: {
        name: "Lalibela Tourism Services",
        phone: "+251-33-336-0080",
        email: "info@lalibelahotel.et",
        verified: true,
      },
      availability: { available: true },
      cancellationPolicy: "Free cancellation up to 24 hours before check-in",
      includes: ["Breakfast", "WiFi", "Airport pickup"],
      excludes: ["Lunch", "Dinner", "Guided tours"],
    },
    {
      id: 2,
      name: "Historic Northern Circuit Tour",
      type: "tour",
      location: "Lalibela, Axum, Gondar",
      rating: 4.8,
      price: 1200,
      currency: "USD",
      duration: "8 days",
      capacity: 12,
      images: ["/placeholder.svg?height=200&width=300&text=Northern+Circuit"],
      amenities: ["Professional Guide", "Transportation", "Accommodation", "Meals"],
      description:
        "Comprehensive 8-day tour covering Ethiopia's historic northern route including Lalibela, Axum, and Gondar.",
      provider: {
        name: "Ethiopian Heritage Tours",
        phone: "+251-91-123-4567",
        email: "tours@ethiopianheritage.com",
        verified: true,
      },
      availability: { available: true },
      cancellationPolicy: "50% refund if cancelled 7 days before departure",
      includes: ["All accommodation", "All meals", "Transportation", "Guide", "Entry fees"],
      excludes: ["International flights", "Personal expenses", "Tips"],
    },
    {
      id: 3,
      name: "Local Expert Guide - Tadesse",
      type: "guide",
      location: "Lalibela",
      rating: 4.9,
      price: 50,
      currency: "USD",
      duration: "Full day",
      capacity: 8,
      images: ["/placeholder.svg?height=200&width=300&text=Guide+Tadesse"],
      amenities: ["English Speaking", "Licensed", "Cultural Expert", "Photography Tips"],
      description:
        "Born and raised in Lalibela, Tadesse has 15 years of experience guiding visitors through the rock churches.",
      provider: {
        name: "Lalibela Guide Association",
        phone: "+251-91-234-5678",
        email: "guides@lalibela.et",
        verified: true,
      },
      availability: { available: true },
      cancellationPolicy: "Free cancellation up to 2 hours before tour",
      includes: ["Professional guiding", "Historical insights", "Photography assistance"],
      excludes: ["Entry fees", "Transportation", "Meals"],
    },
    {
      id: 4,
      name: "4WD Vehicle with Driver",
      type: "transport",
      location: "Lalibela",
      rating: 4.5,
      price: 120,
      currency: "USD",
      duration: "Per day",
      capacity: 4,
      images: ["/placeholder.svg?height=200&width=300&text=4WD+Vehicle"],
      amenities: ["Professional Driver", "Fuel Included", "Insurance", "GPS"],
      description: "Reliable 4WD vehicle with experienced driver for exploring the rugged terrain around Lalibela.",
      provider: {
        name: "Lalibela Car Rental",
        phone: "+251-91-345-6789",
        email: "rentals@lalibelacar.et",
        verified: true,
      },
      availability: { available: true },
      cancellationPolicy: "Free cancellation up to 12 hours before pickup",
      includes: ["Vehicle", "Driver", "Fuel", "Insurance"],
      excludes: ["Guide services", "Entry fees", "Meals"],
    },
  ]

  const filteredItems = bookingItems.filter((item) => {
    if (selectedType === "all") return true
    return item.type === selectedType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hotel":
        return <Bed className="h-5 w-5 text-blue-600" />
      case "tour":
        return <Mountain className="h-5 w-5 text-green-600" />
      case "guide":
        return <Users className="h-5 w-5 text-purple-600" />
      case "transport":
        return <Car className="h-5 w-5 text-orange-600" />
      default:
        return <MapPin className="h-5 w-5" />
    }
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-4 w-4" />
      case "restaurant":
        return <Coffee className="h-4 w-4" />
      case "car":
      case "transportation":
        return <Car className="h-4 w-4" />
      case "professional guide":
        return <Users className="h-4 w-4" />
      case "photography tips":
        return <Camera className="h-4 w-4" />
      case "insurance":
        return <Shield className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const handleBooking = (item: BookingItem) => {
    setSelectedItem(item)
    setBookingStep(1)
  }

  const processBooking = () => {
    setBookingStep(4)
    setTimeout(() => {
      setSelectedItem(null)
      setBookingStep(1)
    }, 3000)
  }

  const calculateTotal = () => {
    if (!selectedItem || typeof selectedItem !== "object") return 0
    let total = (selectedItem as BookingItem).price
    if ((selectedItem as BookingItem).type === "hotel" && checkIn && checkOut) {
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      total = total * nights
    }
    return total
  }

  return (
    <Card className="bg-white shadow-lg rounded-xl border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-6">
        <CardTitle className="text-2xl font-bold flex items-center space-x-3">
          <CreditCard className="h-6 w-6" />
          <span>Book Local Services</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={selectedType} onValueChange={setSelectedType} className="w-full">
            <SelectTrigger className="bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Service Type" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="all" className="hover:bg-gray-100">All Services</SelectItem>
              <SelectItem value="hotel" className="hover:bg-gray-100">Hotels</SelectItem>
              <SelectItem value="tour" className="hover:bg-gray-100">Tours</SelectItem>
              <SelectItem value="guide" className="hover:bg-gray-100">Guides</SelectItem>
              <SelectItem value="transport" className="hover:bg-gray-100">Transport</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-3 bg-gray-50 p-2 rounded-lg">
            <Users className="h-5 w-5 text-gray-500" />
            <Input
              type="number"
              value={guests}
              onChange={(e) => setGuests(Number.parseInt(e.target.value) || 1)}
              min="1"
              max="20"
              className="w-20 bg-transparent border-gray-200 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600 font-medium">guests</span>
          </div>

          {selectedType === "hotel" && (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 w-full justify-start"
                  >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    {checkIn ? format(checkIn, "MMM dd, yyyy") : "Check-in"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border-gray-200">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    initialFocus
                    className="rounded-lg"
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 w-full justify-start"
                  >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    {checkOut ? format(checkOut, "MMM dd, yyyy") : "Check-out"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border-gray-200">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    initialFocus
                    className="rounded-lg"
                  />
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 rounded-xl border-gray-100"
            >
              <CardContent className="p-4 flex space-x-4">
                <img
                  src={item.images[0] || "/placeholder.svg"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg flex items-center space-x-2 text-gray-800">
                        {getTypeIcon(item.type)}
                        <span>{item.name}</span>
                        {item.provider.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {item.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xl text-green-600">${item.price} {item.currency}</div>
                      <div className="text-sm text-gray-500">{item.duration && `/ ${item.duration}`}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm ml-1 font-medium">{item.rating}</span>
                    </div>
                    {item.capacity && (
                      <Badge variant="secondary" className="bg-gray-200 text-gray-700 text-sm">
                        <Users className="h-4 w-4 mr-1" />
                        Up to {item.capacity}
                      </Badge>
                    )}
                    <Badge
                      variant={item.availability.available ? "default" : "destructive"}
                      className="text-sm"
                    >
                      {item.availability.available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.amenities.slice(0, 3).map((amenity) => (
                      <Badge
                        key={amenity}
                        variant="outline"
                        className="bg-white border-gray-300 text-gray-700 text-sm flex items-center space-x-1 hover:bg-gray-100"
                      >
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white border-gray-300 text-gray-700 hover:bg-gray-100 text-sm"
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white shadow-2xl rounded-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold flex items-center space-x-2 text-gray-800">
                            {getTypeIcon(item.type)}
                            <span>{item.name}</span>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6 p-4">
                          <img
                            src={item.images[0] || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-64 object-cover rounded-xl shadow-md"
                          />
                          <p className="text-base text-gray-700">{item.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-base mb-3 text-gray-800">Includes:</h4>
                              <ul className="text-sm space-y-2">
                                {item.includes.map((include, index) => (
                                  <li key={index} className="flex items-center text-gray-700">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                    {include}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-base mb-3 text-gray-800">Excludes:</h4>
                              <ul className="text-sm space-y-2">
                                {item.excludes.map((exclude, index) => (
                                  <li key={index} className="flex items-center text-gray-700">
                                    <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                                    {exclude}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <h4 className="font-semibold text-base mb-2 text-gray-800">Provider Information:</h4>
                            <div className="space-y-2 text-sm text-gray-700">
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-2" />
                                {item.provider.name}
                                {item.provider.verified && <CheckCircle className="h-4 w-4 text-green-500 ml-1" />}
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2" />
                                {item.provider.phone}
                              </div>
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-2" />
                                {item.provider.email}
                              </div>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <p className="text-sm text-gray-600">
                              <strong>Cancellation Policy:</strong> {item.cancellationPolicy}
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      size="sm"
                      onClick={() => handleBooking(item)}
                      disabled={!item.availability.available}
                      className="bg-blue-600 text-white hover:bg-blue-700 text-sm shadow-md transition-all"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <AlertCircle className="h-10 w-10 mx-auto mb-3" />
            <p className="text-lg">No services available for the selected criteria.</p>
          </div>
        )}

        <Dialog open={typeof selectedItem === "object" && !!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-md bg-white shadow-xl rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800">
                {bookingStep === 4 ? "Booking Confirmed!" : `Book ${selectedItem?.name}`}
              </DialogTitle>
            </DialogHeader>

            {bookingStep === 1 && selectedItem && typeof selectedItem === "object" && (
              <div className="space-y-5">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl shadow-inner">
                  <h4 className="font-semibold text-lg mb-3 text-gray-800">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-700">
                      <span>Service:</span>
                      <span>{(selectedItem as BookingItem).name}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Price (per unit):</span>
                      <span>${(selectedItem as BookingItem).price} {(selectedItem as BookingItem).currency}</span>
                    </div>
                    {(selectedItem as BookingItem).type === "hotel" && checkIn && checkOut && (
                      <>
                        <div className="flex justify-between text-gray-700">
                          <span>Check-in:</span>
                          <span>{format(checkIn, "MMM dd, yyyy")}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                          <span>Check-out:</span>
                          <span>{format(checkOut, "MMM dd, yyyy")}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                          <span>Nights:</span>
                          <span>{Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between text-gray-700">
                      <span>Guests:</span>
                      <span>{guests}</span>
                    </div>
                    <Separator className="my-2 bg-gray-300" />
                    <div className="flex justify-between font-semibold text-gray-800">
                      <span>Total:</span>
                      <span>${calculateTotal()} {(selectedItem as BookingItem).currency}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setBookingStep(2)}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 text-lg py-2 shadow-md transition-all"
                >
                  Continue to Details
                </Button>
              </div>
            )}

{bookingStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={bookingData.firstName}
                      onChange={(e) => setBookingData({ ...bookingData, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={bookingData.lastName}
                      onChange={(e) => setBookingData({ ...bookingData, lastName: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="requests">Special Requests</Label>
                  <Textarea
                    id="requests"
                    value={bookingData.specialRequests}
                    onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                    placeholder="Any special requirements or requests..."
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setBookingStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={() => setBookingStep(3)} className="flex-1">
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {bookingStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label>Payment Method</Label>
                  <Select
                    value={bookingData.paymentMethod}
                    onValueChange={(value) => setBookingData({ ...bookingData, paymentMethod: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="cash">Pay on Arrival</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {bookingData.paymentMethod === "card" && (
                  <div className="space-y-3">
                    <Input placeholder="Card Number" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="MM/YY" />
                      <Input placeholder="CVV" />
                    </div>
                    <Input placeholder="Cardholder Name" />
                  </div>
                )}

                <div className="bg-blue-50 p-3 rounded-lg text-xs">
                  <p className="font-semibold mb-1">Secure Payment</p>
                  <p>
                    Your payment information is encrypted and secure. You will receive a confirmation email after
                    booking.
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setBookingStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={processBooking} className="flex-1">
                    Confirm Booking
                  </Button>
                </div>
              </div>
            )}

            {bookingStep === 4 && (
              <div className="text-center space-y-4">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                <div>
                  <h3 className="font-semibold text-lg">Booking Confirmed!</h3>
                  <p className="text-sm text-gray-600">
                    Your booking reference is:{" "}
                    <strong>AMB-{Math.random().toString(36).substr(2, 9).toUpperCase()}</strong>
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-xs">
                  <p>A confirmation email has been sent to {bookingData.email}</p>
                  <p className="mt-1">The service provider will contact you within 24 hours.</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
