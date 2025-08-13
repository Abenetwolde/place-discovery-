import { Header } from "@/components/HomeHeader";
import { CategoriesSection } from "@/components/CategoriesSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ChatBubble } from "@/components/ChatBubble";
import { HeroSection } from "@/components/HeroSection";
import WeatherCurrencyRow from "@/components/WeatherCurrenc";
import TravelTips from "@/components/travel-tip";
import SpecialDeals from "@/components/SpecialDeals";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
   
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <ServicesSection />
        <SpecialDeals/>
        <WeatherCurrencyRow/>
        {/* <TravelTips/> */}
        </main>
      <ChatBubble />
    </div>
  );
}