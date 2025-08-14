"use client";

import { HTMLAttributes, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageProps extends HTMLAttributes<HTMLDivElement> {
  item: { image: string; title: string };
  index: number;
  activeItem: number;
}

interface ExpandableProps {
  list?: { image: string; title: string }[];
  autoPlay?: boolean;
  className?: string;
}

const List: React.FC<ImageProps> = ({ item, className, index, activeItem, ...props }) => {
  return (
    <div
      className={cn(
        "relative flex h-full w-15 min-w-10 cursor-pointer overflow-hidden rounded-xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg",
        {
          "flex-grow": index === activeItem,
        },
        className,
      )}
      {...props}
    >
      <img
        src={item.image}
        alt={item.title}
        className={cn("h-full w-full object-cover transition-all duration-300", {
          "brightness-75": index !== activeItem,
        })}
      />
      {index === activeItem && (
        <div className="absolute top-4 left-4 min-w-fit text-white md:bottom-6 md:left-6">
          <motion.div
            className="text-xl sm:text-1xl md:text-2xl font-bold drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {item.title}
          </motion.div>
        </div>
      )}
    </div>
  );
};

const items = [
  {
    image:
      "https://images.unsplash.com/photo-1516533075015-a3838414c3ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZXRoaW9waWF8ZW58MHx8MHx8fDI%3D",
    title: "Ad1",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573404353091-bd68e3010d73?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Ad2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573401545579-498aa95975bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Ad3",
  },
];

const Expandable: React.FC<ExpandableProps> = ({ list = items, autoPlay = true, className }) => {
  const [activeItem, setActiveItem] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!autoPlay) {
      return;
    }

    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveItem((prev) => (prev + 1) % list.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, list.length, isHovering]);

  return (
    <div className={cn("flex w-full gap-1", className)}>
      {list.map((item, index) => (
        <List
          key={item.title}
          item={item}
          index={index}
          activeItem={activeItem}
          onMouseEnter={() => {
            setActiveItem(index);
            setIsHovering(true);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
          }}
        />
      ))}
    </div>
  );
};

export default Expandable;