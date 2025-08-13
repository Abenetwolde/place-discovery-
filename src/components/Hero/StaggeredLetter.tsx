import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DropLetterProps   {
  applyMask?: boolean;
  text?: string;
  delay?: number;
  direction?: "up" | "drop";
}

const StaggeredLetter: React.FC<DropLetterProps> = ({
  applyMask = true,
  text = "Discover Amazing Places",
  delay = 0.09,
  direction = "drop",
//   className,
  ...props
}) => {
  const common = "text-3xl md:text-4xl font-bold drop-shadow-lg";
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center text-foreground mb-4",
        // className,
      )}
      {...props}
    >
      {applyMask && <div className={cn(common, "absolute text-gray-400")}>{text}</div>}
      <div className="flex">
        {text.split("").map((letter, index) => (
          <motion.div
            className={common}
            initial={{ opacity: 0, y: direction === "up" ? 150 : -150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * delay,
            }}
            key={letter + index}
          >
            {letter === " " ? <span>&nbsp;</span> : letter}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StaggeredLetter;