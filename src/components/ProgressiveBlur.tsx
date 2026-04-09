"use client";

import * as React from "react";

type BlurSide = "top" | "bottom";

interface ProgressiveBlurProps {
  /** Which edge the blur is strongest at @default "bottom" */
  side?: BlurSide;
  /** Blur amount in pixels @default 4 */
  strength?: number;
  /** Thickness of the blurred area @default "120px" */
  size?: string | number;
  /** Background tint color (CSS value) @default "var(--cream)" */
  tintColor?: string;
  /** Opacity of the tint 0–1 @default 0.8 */
  tintStrength?: number;
  className?: string;
}

const FADE_DIR: Record<BlurSide, string> = {
  top: "to bottom",
  bottom: "to top",
};

const POSITION: Record<BlurSide, React.CSSProperties> = {
  top: { top: 0, left: 0 },
  bottom: { bottom: 0, left: 0 },
};

export const ProgressiveBlur = React.memo(function ProgressiveBlur({
  side = "bottom",
  strength = 4,
  size = "120px",
  tintColor = "var(--cream)",
  tintStrength = 0.8,
  className = "",
}: ProgressiveBlurProps) {
  const sizeValue = typeof size === "number" ? `${size}px` : size;
  const fadeDir = FADE_DIR[side];

  const maskImage = `linear-gradient(${fadeDir}, black 50%, transparent 100%)`;
  const background = `linear-gradient(${fadeDir}, color-mix(in oklch, ${tintColor} ${Math.round(tintStrength * 100)}%, transparent) 0%, transparent 100%)`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 w-full ${className}`}
      style={{
        height: sizeValue,
        ...POSITION[side],
        background,
        maskImage,
        WebkitMaskImage: maskImage,
        backdropFilter: `blur(${strength}px)`,
        WebkitBackdropFilter: `blur(${strength}px)`,
        willChange: "backdrop-filter",
      }}
    />
  );
});
