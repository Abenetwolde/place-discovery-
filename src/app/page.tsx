"use client"
import { Header } from "@/components/HomeHeader";
import { CategoriesSection } from "@/components/CategoriesSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ChatBubble } from "@/components/ChatBubble";
import { HeroSection } from "@/components/HeroSection";
import WeatherCurrencyRow from "@/components/WeatherCurrenc";
import TravelTips from "@/components/travel-tip";
import SpecialDeals from "@/components/SpecialDeals";
import { Bot, MessageCircle } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Chatbot from "@/components/chatbot";

export default function Home() {
  const [isOpen, setOpen]=useState()
  return (
    <div className="min-h-screen bg-background text-foreground">
   
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <ServicesSection />
        <SpecialDeals/>
        <WeatherCurrencyRow/>
        {/* <TravelTips/> */}
        </main>
      {/* <ChatBubble />
       */}
       <button
  onClick={() => setOpen(!isOpen)}
  className="fixed bottom-6 right-6 z-50 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-200 animate-pulse-ring"
>
  {isOpen ? <Bot size={24} /> : <MessageCircle size={24} />}
</button>

  {isOpen &&
     <Chatbot/>
   
  }

    </div>
    
  );
}