"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#assessment", label: "The Assessment" },
  { href: "#haven-care", label: "Haven Care" },
  { href: "#pricing", label: "Pricing" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-charcoal hover:text-charcoal-light transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-cream z-[60] shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-2xl font-serif text-charcoal">Haven</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-charcoal hover:text-charcoal-light transition-colors"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg text-charcoal-light hover:text-charcoal transition-colors py-2"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary mt-4 text-center"
                  >
                    Book Assessment
                  </Link>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
