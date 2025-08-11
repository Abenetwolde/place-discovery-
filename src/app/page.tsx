import { Header } from "@/components/HomeHeader";
import { CategoriesSection } from "@/components/CategoriesSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ChatBubble } from "@/components/ChatBubble";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <ServicesSection />
      </main>
      <ChatBubble />
    </div>
  );
}