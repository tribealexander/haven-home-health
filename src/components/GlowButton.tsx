"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface GlowButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  /** Glow colors @default sage-based palette */
  colors?: string[];
  /** Animation duration in seconds @default 5 */
  duration?: number;
  /** Blur strength @default "6px" */
  blur?: string;
  /** Glow opacity 0–1 @default 0.45 */
  opacity?: number;
}

export function GlowButton({
  children,
  className = "",
  href,
  onClick,
  colors = ["#7D8B75", "#5C6B54", "#B8860B", "#7D8B75"],
  duration = 5,
  blur = "6px",
  opacity = 0.45,
}: GlowButtonProps) {
  const gradient = `conic-gradient(from 0deg at 50% 50%, ${colors.join(", ")})`;
  const gradientEnd = `conic-gradient(from 360deg at 50% 50%, ${colors.join(", ")})`;

  const glowLayer = (
    <motion.div
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{ filter: `blur(${blur})`, opacity }}
      animate={{
        background: [gradient, gradientEnd],
      }}
      transition={{
        repeat: Infinity,
        duration,
        ease: "linear",
      }}
    />
  );

  const content = href ? (
    <a href={href} className={`relative z-10 block ${className}`} onClick={onClick}>
      {children}
    </a>
  ) : (
    <button className={`relative z-10 ${className}`} onClick={onClick}>
      {children}
    </button>
  );

  return (
    <motion.div
      className="relative inline-flex"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {glowLayer}
      {content}
    </motion.div>
  );
}
