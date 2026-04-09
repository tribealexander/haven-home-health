"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

interface ShimmeringTextProps {
  text: string;
  /** Sweep duration in seconds @default 2.5 */
  duration?: number;
  /** Animation delay @default 0 */
  delay?: number;
  /** Repeat animation @default true */
  repeat?: boolean;
  /** Pause between repeats @default 1 */
  repeatDelay?: number;
  /** Base text color @default "var(--charcoal)" */
  color?: string;
  /** Shimmer highlight color @default "var(--sage)" */
  shimmerColor?: string;
  /** Spread multiplier @default 2 */
  spread?: number;
  /** Animate only once @default false */
  once?: boolean;
  className?: string;
}

export function ShimmeringText({
  text,
  duration = 2.5,
  delay = 0,
  repeat = true,
  repeatDelay = 1,
  color = "var(--charcoal)",
  shimmerColor = "var(--sage)",
  spread = 2,
  once = false,
  className = "",
}: ShimmeringTextProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "0px 0px -10% 0px" });

  const dynamicSpread = React.useMemo(() => text.length * spread, [text, spread]);

  return (
    <motion.span
      ref={ref}
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundSize: "250% 100%",
        backgroundRepeat: "no-repeat",
        backgroundImage: `linear-gradient(90deg, transparent calc(50% - ${dynamicSpread}px), ${shimmerColor}, transparent calc(50% + ${dynamicSpread}px)), linear-gradient(${color}, ${color})`,
      }}
      initial={{
        backgroundPosition: "100% center",
        opacity: 0,
      }}
      animate={
        isInView
          ? {
              backgroundPosition: "0% center",
              opacity: 1,
            }
          : {}
      }
      transition={{
        backgroundPosition: {
          repeat: repeat ? Infinity : 0,
          duration,
          delay,
          repeatDelay,
          ease: "linear",
        },
        opacity: {
          duration: 0.3,
          delay,
        },
      }}
    >
      {text}
    </motion.span>
  );
}
