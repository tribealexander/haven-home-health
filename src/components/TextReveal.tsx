"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  /** The text to animate */
  text: string;
  /** HTML tag for the container @default "p" */
  as?: "p" | "h1" | "h2" | "h3" | "span";
  /** Split mode @default "words" */
  splitBy?: "words" | "characters";
  /** Delay between each unit in seconds @default 0.04 */
  staggerDelay?: number;
  /** Duration per unit in seconds @default 0.5 */
  duration?: number;
  /** Trigger only once @default true */
  once?: boolean;
  className?: string;
}

export function TextReveal({
  text,
  as: Tag = "p",
  splitBy = "words",
  staggerDelay = 0.04,
  duration = 0.5,
  once = true,
  className = "",
}: TextRevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, margin: "0px 0px -10% 0px" });

  const units =
    splitBy === "words"
      ? text
          .split(/\s+/)
          .map((w, i, arr) => (i < arr.length - 1 ? w + "\u00A0" : w))
      : text.split("");

  return (
    // @ts-expect-error - dynamic tag with ref
    <Tag ref={ref} className={className} aria-label={text}>
      {units.map((unit, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.1, filter: "blur(8px)" }}
          animate={
            isInView
              ? { opacity: 1, filter: "blur(0px)" }
              : { opacity: 0.1, filter: "blur(8px)" }
          }
          transition={{
            duration,
            delay: i * staggerDelay,
            ease: "easeOut",
          }}
          style={{ display: "inline-block" }}
          className="will-change-[opacity,filter]"
        >
          {unit}
        </motion.span>
      ))}
    </Tag>
  );
}
