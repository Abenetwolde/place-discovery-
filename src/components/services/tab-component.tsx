"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabProps {
  text: string;
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export default function Tab({ text, selected, setSelected }: TabProps) {
  return (
    <button
      onClick={() => setSelected(text)}
      className={cn(
        "relative rounded-md px-4 py-2 text-sm transition-all",
        selected ? "text-white bg-black" : "text-gray-700 bg-gray-200 hover:bg-gray-300"
      )}
    >
      <p className="relative z-50">{text}</p>
      {selected && (
        <motion.span
          layoutId="tabs"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 rounded-md bg-black"
        />
      )}
    </button>
  );
}