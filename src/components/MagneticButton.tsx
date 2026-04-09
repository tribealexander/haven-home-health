"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  /** Activation radius in px @default 120 */
  radius?: number;
  /** Pull strength 0–1 @default 0.4 */
  strength?: number;
  springOptions?: SpringOptions;
  href?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = "",
  radius = 120,
  strength = 0.4,
  springOptions = { stiffness: 150, damping: 15, mass: 0.1 },
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, springOptions);
  const y = useSpring(rawY, springOptions);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const pull = (1 - dist / radius) * strength;
        rawX.set(dx * pull);
        rawY.set(dy * pull);
      }
    },
    [radius, strength, rawX, rawY]
  );

  const handleMouseLeave = React.useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  if (href) {
    return (
      <motion.div
        ref={ref}
        style={{ x, y, display: "inline-block" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <a href={href} className={className} onClick={onClick}>
          {children}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <button className={className} onClick={onClick}>
        {children}
      </button>
    </motion.div>
  );
}
