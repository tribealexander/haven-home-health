"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const categories = [
  { cat: "Radon", score: 45, color: "bg-red-400" },
  { cat: "Air Quality", score: 78, color: "bg-sage" },
  { cat: "Water", score: 82, color: "bg-sage" },
  { cat: "Combustion Safety", score: 91, color: "bg-sage" },
  { cat: "Mold Risk", score: 68, color: "bg-yellow-500" },
  { cat: "Ventilation", score: 55, color: "bg-yellow-500" },
];

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

export function HavenIndex() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="bg-charcoal-light p-8 rounded-2xl">
      <div className="text-center mb-6">
        <div className="text-8xl font-serif text-sage mb-2">
          <CountUp end={72} duration={1.5} />
        </div>
        <div className="text-cream/60">Sample Haven Index Score</div>
      </div>
      <div className="space-y-4">
        {categories.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-cream/80">{item.cat}</span>
              <span className="text-cream/60">{item.score}</span>
            </div>
            <div className="h-2 bg-charcoal rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${item.score}%` } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                className={`h-full ${item.color} rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
