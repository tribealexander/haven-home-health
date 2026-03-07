"use client";

import Link from "next/link";
import {
  Radiation,
  Wind,
  Droplets,
  Flame,
  Scan,
  Fan,
  BarChart3,
  Wrench,
  TrendingUp,
  Quote,
} from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { MobileNav } from "@/components/MobileNav";
import { HavenIndex } from "@/components/HavenIndex";

const assessmentItems = [
  {
    title: "Radon Testing",
    desc: "We deploy professional monitors for 48+ hours to capture accurate readings—radon is the leading cause of lung cancer in non-smokers.",
    Icon: Radiation,
  },
  {
    title: "Air Quality",
    desc: "Multi-room monitoring over 24+ hours. We measure PM2.5, CO2, VOCs, and humidity—including overnight when closed doors can reveal ventilation issues.",
    Icon: Wind,
  },
  {
    title: "Water Analysis",
    desc: "Heavy metals, PFAS, nitrates, bacteria, and more. Lab-certified results.",
    Icon: Droplets,
  },
  {
    title: "Combustion Safety",
    desc: "Gas appliance testing, carbon monoxide risk, and exhaust ventilation for furnaces, water heaters, and stoves.",
    Icon: Flame,
  },
  {
    title: "Mold & Moisture",
    desc: "Thermal imaging and moisture mapping to identify hidden problems.",
    Icon: Scan,
  },
  {
    title: "Ventilation Audit",
    desc: "HRV/ERV performance, bathroom exhaust, and whole-home air exchange rates.",
    Icon: Fan,
  },
];

const havenCareItems = [
  {
    title: "Smart Monitoring",
    desc: "Professional-grade sensors for radon, air quality, and humidity—with real-time alerts to your phone.",
    Icon: BarChart3,
  },
  {
    title: "Bi-Annual Service",
    desc: "Twice-yearly visits for filter changes, sensor calibration, and system checks. We keep your home health systems running perfectly.",
    Icon: Wrench,
  },
  {
    title: "Annual Re-Assessment",
    desc: "Full Haven Assessment every 12 months to track improvements and catch new issues early.",
    Icon: TrendingUp,
  },
];

const testimonials = [
  {
    quote: "We had no idea our radon levels were that high. The Haven Assessment gave us clear answers and a roadmap to fix it. Our family sleeps better knowing our home is safe.",
    name: "Sarah M.",
    location: "Toronto",
    initials: "SM",
  },
  {
    quote: "The Haven Index made it so clear what to prioritize. Instead of guessing, we knew exactly where to invest our money for the biggest health impact.",
    name: "James K.",
    location: "Peterborough",
    initials: "JK",
  },
  {
    quote: "Professional, thorough, and genuinely helpful. The report was incredibly detailed but easy to understand. Worth every penny.",
    name: "Michael & Lisa R.",
    location: "Oakville",
    initials: "MR",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-charcoal/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif text-charcoal">
            Haven
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="#assessment" className="text-charcoal-light hover:text-charcoal transition-colors">
              The Assessment
            </Link>
            <Link href="#haven-care" className="text-charcoal-light hover:text-charcoal transition-colors">
              Haven Care
            </Link>
            <Link href="#pricing" className="text-charcoal-light hover:text-charcoal transition-colors">
              Pricing
            </Link>
            <Link href="#contact" className="btn-primary">
              Book Assessment
            </Link>
          </div>
          <MobileNav />
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Abstract gradient background */}
        <div className="absolute inset-0">
          {/* Base warm gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream-dark to-[#E8DFD4]" />

          {/* Soft organic shapes */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-sage/[0.08] blur-3xl transform translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#D4C4B0]/40 blur-3xl transform -translate-x-1/3 translate-y-1/4" />
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-sage/[0.05] blur-2xl transform -translate-x-1/2 -translate-y-1/2" />

          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(125,139,117,0.1) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
          <AnimatedSection>
            <p className="text-sage text-sm tracking-[0.2em] uppercase mb-8 font-medium">
              Home Health Assessments
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-charcoal leading-[0.9] mb-8 tracking-tight">
              YOUR HOME
              <br />
              <span className="italic text-charcoal/80">SHOULD BE</span>
              <br />
              YOUR HAVEN
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-lg md:text-xl text-warm-gray max-w-xl mx-auto mb-12 leading-relaxed">
              Radon. Air quality. Water contaminants. We find what&apos;s hidden—and help you fix it.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#contact" className="btn-primary px-10 py-4 text-lg">
                Book Your Assessment
              </Link>
              <Link href="#assessment" className="btn-secondary px-10 py-4 text-lg">
                Learn More
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <AnimatedSection delay={0.5}>
            <div className="w-6 h-10 border-2 border-charcoal/20 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-charcoal/40 rounded-full animate-bounce" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 px-6 bg-cream-dark">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <p className="text-sage text-sm tracking-widest uppercase mb-4">The Hidden Truth</p>
              <h2 className="text-4xl font-serif text-charcoal mb-6">
                You don&apos;t know what you don&apos;t know.
              </h2>
              <p className="text-warm-gray text-lg leading-relaxed mb-6">
                Canadian homes face unique challenges. Tight building envelopes trap radon gas. Aging pipes leach contaminants. HVAC systems circulate pollutants. And most of it is invisible.
              </p>
              <p className="text-warm-gray text-lg leading-relaxed">
                The average homeowner discovers these issues by accident—or not at all. We believe you deserve to know exactly what&apos;s in your home, quantified with professional-grade instruments and prioritized by actual health impact.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="bg-cream p-8 rounded-2xl shadow-sm">
                <h3 className="font-serif text-2xl text-charcoal mb-6">What most homeowners miss:</h3>
                <ul className="space-y-4">
                  {[
                    { stat: "1 in 5", desc: "Ontario homes have elevated radon levels" },
                    { stat: "43%", desc: "of Canadian homes have poor indoor air quality" },
                    { stat: "80%", desc: "of water quality issues go undetected without testing" },
                    { stat: "0%", desc: "of standard home inspections test for health hazards" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="text-2xl font-serif text-sage font-semibold min-w-[70px]">{item.stat}</span>
                      <span className="text-charcoal-light">{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* The Assessment */}
      <section id="assessment" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sage text-sm tracking-widest uppercase mb-4">The Haven Assessment</p>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-6">
              The most comprehensive home
              <br />health assessment in Canada.
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              A 4-6 hour on-site evaluation using professional-grade instruments, followed by a detailed report and remediation roadmap.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessmentItems.map((item, i) => (
              <StaggerItem key={i}>
                <div className="card h-full">
                  <div className="icon-wrapper mb-4">
                    <item.Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl text-charcoal mb-3">{item.title}</h3>
                  <p className="text-warm-gray">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Haven Index */}
      <section className="py-20 px-6 bg-charcoal text-cream">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <p className="text-sage text-sm tracking-widest uppercase mb-4">Proprietary Methodology</p>
              <h2 className="text-4xl font-serif mb-6">
                The Haven Index&trade;
              </h2>
              <p className="text-cream/80 text-lg leading-relaxed mb-6">
                We don&apos;t just hand you a pile of numbers. Every measurement is weighted by health impact and aggregated into a single, actionable score.
              </p>
              <p className="text-cream/80 text-lg leading-relaxed mb-8">
                Your Haven Index tells you exactly where you stand—and exactly what to fix first.
              </p>
              <div className="flex gap-8">
                <div>
                  <div className="text-4xl font-serif text-sage mb-2">0-100</div>
                  <div className="text-cream/60 text-sm">Single score</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-sage mb-2">6</div>
                  <div className="text-cream/60 text-sm">Categories weighted</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-sage mb-2">30+</div>
                  <div className="text-cream/60 text-sm">Data points</div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <HavenIndex />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Haven Care */}
      <section id="haven-care" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sage text-sm tracking-widest uppercase mb-4">Ongoing Protection</p>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-6">
              Haven Care
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              Your home health isn&apos;t a one-time snapshot. It&apos;s a living system that needs ongoing attention. Haven Care keeps you protected year-round.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {havenCareItems.map((item, i) => (
              <StaggerItem key={i}>
                <div className="card text-center h-full">
                  <div className="icon-wrapper mx-auto mb-6">
                    <item.Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl text-charcoal mb-3">{item.title}</h3>
                  <p className="text-warm-gray">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection delay={0.3} className="mt-12">
            <div className="bg-sage/10 p-8 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h3 className="font-serif text-2xl text-charcoal mb-2">Haven Care Membership</h3>
                  <p className="text-warm-gray">Smart monitoring + bi-annual service + annual assessment</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-serif text-charcoal">$149<span className="text-lg text-warm-gray">/month</span></div>
                  <p className="text-sage text-sm">Includes equipment</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Circadian Lighting */}
      <section className="py-20 px-6 bg-charcoal text-cream">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <p className="text-sage text-sm tracking-widest uppercase mb-4">Add-On Service</p>
              <h2 className="text-4xl font-serif mb-6">
                Circadian Lighting
              </h2>
              <p className="text-cream/80 text-lg leading-relaxed mb-6">
                Your lights affect your sleep, energy, and mood more than you realize. Blue-rich light at night suppresses melatonin and disrupts your circadian rhythm.
              </p>
              <p className="text-cream/80 text-lg leading-relaxed mb-8">
                We install smart lighting that automatically shifts throughout the day—bright and energizing in the morning, warm and sleep-friendly at night. No switches to flip, no apps to open.
              </p>
              <div className="flex gap-8">
                <div>
                  <div className="text-4xl font-serif text-sage mb-2">5000K</div>
                  <div className="text-cream/60 text-sm">Morning (energizing)</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-sage mb-2">2700K</div>
                  <div className="text-cream/60 text-sm">Evening (relaxing)</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-sage mb-2">2200K</div>
                  <div className="text-cream/60 text-sm">Night (sleep-ready)</div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="card-dark p-8">
                <h3 className="font-serif text-2xl mb-6 text-cream">What&apos;s included:</h3>
                <ul className="space-y-4 mb-8">
                  {[
                    "Smart bulbs or switches for key rooms",
                    "Programmed to your wake/sleep schedule",
                    "Tied to sunrise/sunset for your location",
                    "Remote adjustments via Haven Care",
                    "Seasonal schedule updates",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-sage mt-1">&#10003;</span>
                      <span className="text-cream/90">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-cream/10 pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-serif text-cream">$795</div>
                      <div className="text-cream/60 text-sm">Installed, hardware included</div>
                    </div>
                    <Link href="#contact" className="btn-sage">
                      Add to Assessment
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-cream-dark">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sage text-sm tracking-widest uppercase mb-4">Investment</p>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-6">
              Pricing
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              Comprehensive testing. Clear answers. Actionable roadmap.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <StaggerItem>
              <div className="bg-cream p-10 rounded-2xl shadow-sm h-full flex flex-col">
                <h3 className="font-serif text-2xl text-charcoal mb-2">Haven Assessment</h3>
                <p className="text-warm-gray mb-6">Complete home health evaluation</p>
                <div className="text-4xl font-serif text-charcoal mb-6">
                  $1,495
                  <span className="text-lg text-warm-gray font-sans"> + HST</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {[
                    "4-6 hour on-site assessment",
                    "All 6 testing categories",
                    "Haven Index score & report",
                    "Prioritized remediation roadmap",
                    "60-min results consultation",
                    "Contractor referral network",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-sage mt-1">&#10003;</span>
                      <span className="text-charcoal-light">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="#contact" className="btn-primary block w-full text-center py-4">
                  Book Assessment
                </Link>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-charcoal p-10 rounded-2xl text-cream h-full flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-serif text-2xl">Haven Complete</h3>
                  <span className="bg-sage/30 text-sage text-xs px-3 py-1 rounded-full">MOST POPULAR</span>
                </div>
                <p className="text-cream/70 mb-6">Assessment + first year of Haven Care</p>
                <div className="text-4xl font-serif mb-6">
                  $2,995
                  <span className="text-lg text-cream/70 font-sans"> + HST</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {[
                    "Everything in Haven Assessment",
                    "Smart monitoring sensors (yours to keep)",
                    "2 bi-annual service visits",
                    "Year-end re-assessment included",
                    "Priority scheduling",
                    "Save $288 vs. separate purchase",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-sage mt-1">&#10003;</span>
                      <span className="text-cream/90">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="#contact" className="btn-light block w-full text-center py-4">
                  Get Started
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <AnimatedSection delay={0.3}>
            <p className="text-center text-warm-gray mt-8">
              Serving Toronto, Peterborough, and communities across Ontario. Travel fees may apply outside the GTA.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sage text-sm tracking-widest uppercase mb-4">What Homeowners Say</p>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal">
              Peace of mind, delivered.
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <StaggerItem key={i}>
                <div className="bg-cream-dark p-8 rounded-2xl h-full flex flex-col">
                  <Quote size={32} className="text-sage/30 mb-4" strokeWidth={1} />
                  <p className="text-charcoal-light leading-relaxed mb-6 flex-grow">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center">
                      <span className="text-sage font-medium">{t.initials}</span>
                    </div>
                    <div>
                      <div className="text-charcoal font-medium">{t.name}</div>
                      <div className="text-warm-gray text-sm">{t.location}</div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-20 px-6 bg-cream-dark">
        <AnimatedSection className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-6">
            Ready to know what&apos;s in your home?
          </h2>
          <p className="text-warm-gray text-lg mb-10">
            Book a call to discuss your home and see if Haven is right for you. No pressure, no obligation.
          </p>
          <Link href="mailto:hello@havenhomehealth.ca" className="btn-primary px-10 py-4 text-lg">
            Book a Free Consultation
          </Link>
          <p className="text-warm-gray text-sm mt-6">
            Or email us directly at hello@havenhomehealth.ca
          </p>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-charcoal text-cream">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <span className="text-2xl font-serif">Haven</span>
              <p className="text-cream/60 text-sm mt-1">Home Health Assessments for Ontario</p>
            </div>
            <div className="flex gap-8 text-sm text-cream/60">
              <Link href="#assessment" className="hover:text-cream transition-colors">Assessment</Link>
              <Link href="#haven-care" className="hover:text-cream transition-colors">Haven Care</Link>
              <Link href="#pricing" className="hover:text-cream transition-colors">Pricing</Link>
              <Link href="#contact" className="hover:text-cream transition-colors">Contact</Link>
            </div>
          </div>
          <div className="border-t border-cream/10 mt-8 pt-8 text-center text-cream/40 text-sm">
            &copy; {new Date().getFullYear()} Haven Home Health. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
