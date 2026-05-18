"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";

interface Props extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
}

const variants: Record<string, string> = {
  primary:
    "bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 text-white shadow-neon",
  ghost:
    "bg-white/5 text-slate-100 border border-cyan-400/30 hover:bg-cyan-400/10",
  danger:
    "bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-[0_0_24px_rgba(239,68,68,0.45)]",
};

const sizes: Record<string, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const GlowButton = forwardRef<HTMLButtonElement, Props>(function GlowButton(
  { children, className, variant = "primary", size = "md", ...rest },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative rounded-xl font-semibold tracking-wide overflow-hidden",
        "transition-shadow duration-300",
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
});

export default GlowButton;
