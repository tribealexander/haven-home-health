"use client";

import * as React from "react";
import { Tilt, type TiltProps } from "./Tilt";
import { RadialShine } from "./RadialShine";
import type { LucideIcon } from "lucide-react";

interface TiltCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  className?: string;
  /** Variant controls color scheme */
  variant?: "light" | "dark";
  tiltProps?: Omit<TiltProps, "children" | "className">;
}

export function TiltCard({
  title,
  description,
  Icon,
  className = "",
  variant = "light",
  tiltProps,
}: TiltCardProps) {
  const isLight = variant === "light";

  return (
    <Tilt
      rotationFactor={10}
      springOptions={{ stiffness: 200, damping: 22 }}
      {...tiltProps}
      className={`
        relative group overflow-hidden rounded-2xl h-full
        transition-shadow duration-300
        ${isLight
          ? "bg-cream-dark hover:shadow-[0_8px_30px_rgba(125,139,117,0.12)]"
          : "bg-charcoal-light hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
        }
        ${className}
      `}
    >
      <div className="relative z-10 p-8">
        <div
          className={`
            w-14 h-14 flex items-center justify-center rounded-full mb-5
            transition-colors duration-300
            ${isLight
              ? "bg-sage/15 text-sage group-hover:bg-sage/25"
              : "bg-sage/20 text-sage group-hover:bg-sage/30"
            }
          `}
        >
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <h3
          className={`font-serif text-xl mb-3 ${isLight ? "text-charcoal" : "text-cream"}`}
        >
          {title}
        </h3>
        <p className={isLight ? "text-warm-gray" : "text-cream/70"}>
          {description}
        </p>
      </div>
      <RadialShine
        circleClassName={isLight ? "bg-sage/8" : "bg-sage/12"}
        circleSize={450}
      />
    </Tilt>
  );
}
