"use client"; // Client component for positioning

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ChatBubble() {
  return (
    <Button className="fixed bottom-4 right-4 rounded-full p-0 w-12 h-12 shadow-lg" variant="default">
      <Avatar className="w-full h-full">
        <AvatarFallback>
          <MessageCircle className="h-6 w-6" />
        </AvatarFallback>
      </Avatar>
    </Button>
  );
}