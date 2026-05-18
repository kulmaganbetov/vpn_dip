"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";

interface Props extends Omit<HTMLMotionProps<"div">, "children"> {
  glow?: "cyan" | "violet" | "pink" | "none";
  hoverLift?: boolean;
  children?: ReactNode;
}

const glowMap: Record<string, string> = {
  cyan: "hover:shadow-neon",
  violet: "hover:shadow-neon-violet",
  pink: "hover:shadow-[0_0_24px_rgba(236,72,153,0.4)]",
  none: "",
};

const GlassCard = forwardRef<HTMLDivElement, Props>(function GlassCard(
  { children, className, glow = "cyan", hoverLift = true, ...rest },
  ref
) {
  return (
    <motion.div
      ref={ref}
      whileHover={hoverLift ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      className={cn(
        "glass relative rounded-2xl p-6 transition-shadow duration-500",
        glowMap[glow],
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
});

export default GlassCard;
