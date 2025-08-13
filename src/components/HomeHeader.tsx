"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Globe, ChevronDown, Home, Book, LogIn } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [selectedItem, setSelectedItem] = useState("logo");
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
  ];

  return (
    <header
      className="bg-background border-t sm:border-b sticky sm:top-0 bottom-0 z-10 transition-all duration-300"
    >
      <div className="container mx-auto px-4 py-2 sm:py-4">
        <nav className="flex flex-col sm:flex-row items-center justify-between sm:space-x-4">
          {/* Bottom Navigation Bar for small screens */}
          <div className="flex sm:hidden w-full justify-around py-2 bg-card">
            <Button
              variant={selectedItem === "logo" ? "default" : "ghost"}
              onClick={() => setSelectedItem("logo")}
              className="flex-1 flex flex-col items-center text-xs"
            >
              <Home className="h-5 w-5 mb-1" />
              Home
            </Button>
            <Button
              variant={selectedItem === "myBooking" ? "default" : "ghost"}
              onClick={() => setSelectedItem("myBooking")}
              className="flex-1 flex flex-col items-center text-xs"
            >
              <Book className="h-5 w-5 mb-1" />
              My Booking
            </Button>
            <Button
              variant={selectedItem === "signIn" ? "default" : "ghost"}
              onClick={() => setSelectedItem("signIn")}
              className="flex-1 flex flex-col items-center text-xs"
            >
              <LogIn className="h-5 w-5 mb-1" />
              Sign In
            </Button>
          </div>

          {/* Top Header for larger screens */}
          <div className="hidden sm:flex items-center justify-between w-full">
            <div className="text-xl sm:text-2xl font-bold">Logo</div>
            <div className="flex items-center space-x-4">
              <Select>
                <SelectTrigger className="w-[180px] pl-2 pr-2">
                  <Globe className="  h-4 w-4 opacity-50" />
                  <SelectValue placeholder="Select Language" />
                  {/* <ChevronDown className="ml-2 h-4 w-4 opacity-50" /> */}
                </SelectTrigger>
                <SelectContent className="w-[180px]">
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="ghost">My Booking</Button>
              <Button>Sign In</Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}