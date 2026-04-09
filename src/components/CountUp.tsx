"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import useMeasure from "react-use-measure";

interface CountUpProps {
  to: number;
  from?: number;
  /** Animation duration in seconds @default 2 */
  duration?: number;
  /** Delay before starting @default 0 */
  delay?: number;
  /** Text to show after the number @default "" */
  suffix?: string;
  /** Text to show before the number @default "" */
  prefix?: string;
  /** Thousand separator @default "" */
  separator?: string;
  className?: string;
}

function OdometerDigit({
  springValue,
  place,
}: {
  springValue: MotionValue<number>;
  place: number;
}) {
  const [ref, { height }] = useMeasure();

  const y = useTransform(springValue, (v) => {
    if (!height) return 0;
    const digit = (Math.abs(v) / place) % 10;
    return -digit * height;
  });

  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        width: "1ch",
        overflowY: "clip",
        overflowX: "visible",
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <span ref={ref} style={{ visibility: "hidden", display: "block" }}>
        0
      </span>
      <motion.span
        style={{
          y,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {Array.from({ length: 11 }, (_, i) => (
          <span
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: height || "1em",
            }}
          >
            {i % 10}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function CountUp({
  to,
  from = 0,
  duration = 2,
  delay = 0,
  suffix = "",
  prefix = "",
  separator = "",
  className = "",
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const springValue = useSpring(motionValue, { damping, stiffness });

  React.useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => {
        motionValue.set(to);
      }, delay * 1000);
      return () => clearTimeout(t);
    }
  }, [isInView, motionValue, to, delay]);

  // Build digit structure from target number
  const targetStr = separator
    ? Intl.NumberFormat("en-US").format(to).replace(/,/g, separator)
    : to.toString();

  const structure: Array<{ type: "digit" | "sep"; char?: string; placeIdx?: number }> = [];
  let digitCount = 0;
  for (const ch of targetStr) {
    if (/\d/.test(ch)) digitCount++;
  }
  let d = 0;
  for (const ch of targetStr) {
    if (/\d/.test(ch)) {
      structure.push({ type: "digit", placeIdx: digitCount - 1 - d });
      d++;
    } else {
      structure.push({ type: "sep", char: ch });
    }
  }

  return (
    <span
      ref={ref}
      className={`inline-flex items-center ${className}`}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {prefix && <span>{prefix}</span>}
      {structure.map((item, i) =>
        item.type === "sep" ? (
          <span key={i}>{item.char}</span>
        ) : (
          <OdometerDigit
            key={i}
            springValue={springValue}
            place={Math.pow(10, item.placeIdx!)}
          />
        )
      )}
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
