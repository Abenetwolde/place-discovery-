"use client";

import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";

interface Location {
  value: string;
  label: string;
}

interface SearchBarProps {
  locations: Location[];
  onLocationSelect: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ locations, onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLocations = locations.filter((loc) =>
    loc.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-8 mt-10 mx-auto flex flex-row justify-center items-center gap-1 sm:gap-x-2 w-full sm:w-3/4 bg-green-900 rounded-full shadow-lg  border border-gray-300">
      <div className="w-full sm:w-1/3">
        <Popover>
  <PopoverTrigger asChild>
  <div className="relative focus-visible:ring-0 focus-visible:ring-offset-0">
    <MapPin className="animate-pulse-color absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-pink-400 pointer-events-none" />
    <Input
      placeholder="Search Location"
      value={selectedLocation}
      className="w-full h-12 pl-10 pr-4 text-sm bg-white rounded-l-full border-[1px] !border-gray-300 focus:border-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  </div>
</PopoverTrigger>
          <PopoverContent className="w-[250px] p-0 bg-white rounded-lg shadow-lg">
            <div className="p-2">
              <div className="relative mb-2">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-2 py-1 text-sm bg-gray-100 rounded border border-gray-200"
                />
              </div>
              <div className="max-h-40 overflow-y-auto">
                {filteredLocations.map((loc) => (
                  <div
                    key={loc.value}
                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-gray-800"
                    onClick={() => {
                      setSelectedLocation(loc.label);
                      setSearchTerm("");
                      onLocationSelect(loc.label);
                    }}
                  >
                    {loc.label}
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="w-full sm:w-2/3">
      <Input
  placeholder="Search for places, and more..."
  className="w-full h-12 py-3 text-sm bg-white rounded-r-full border border-gray-300 focus:border-gray-400 text-gray-800 placeholder-gray-400"
/>
      </div>
    </div>
  );
};

export default SearchBar;