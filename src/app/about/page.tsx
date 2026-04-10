"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";
import { Award, Users, MapPin, Star } from "lucide-react";

const milestones = [
  { year: "2005", event: "Founded in Raipur Darwaja, Ahmedabad" },
  { year: "2010", event: "Expanded to 200+ product catalogue" },
  { year: "2015", event: "Reached 200 dealer network across Gujarat" },
  { year: "2020", event: "Received ISI certification for all products" },
  { year: "2025", event: "500+ active retailers, 25 cities served" },
];

const values = [
  { icon: "🏆", title: "Quality First", desc: "Every product is ISI certified and food-grade tested before dispatch." },
  { icon: "🤝", title: "Dealer Focus", desc: "We build long-term partnerships with our retailers, not just transactions." },
  { icon: "🌱", title: "Sustainable", desc: "Stainless steel is the most eco-friendly and durable kitchen material." },
  { icon: "💡", title: "Innovation", desc: "Constantly updating our range to match modern kitchen trends." },
];

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">

      {/* HERO */}
      <section className="bg-gradient-to-br from-orange-600 to-amber-500 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white/70 text-xs font-bold tracking-widest uppercase mb-4 block">
              Our Story
            </span>
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              20 Years of Kitchen Excellence
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              From a small shop in Ahmedabad's oldest market to a trusted
              name in 25 cities — Shree Krishna Vasan Bhandar has been
              serving Indian kitchens since 2005.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gray-950 text-white py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: <Award size={24} />, value: "350+", label: "Products" },
            { icon: <Users size={24} />, value: "500+", label: "Retailers" },
            { icon: <MapPin size={24} />, value: "25+", label: "Cities" },
            { icon: <Star size={24} />, value: "20+", label: "Years" },
          ].map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div>
                <div className="text-orange-400 flex justify-center mb-2">{s.icon}</div>
                <div className="text-3xl font-black">{s.value}</div>
                <div className="text-gray-400 text-sm mt-1">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/p/AF1QipP8hNmptnuhNv0CkL_SXvgD1ZDkJoPe3hKlbaKw=s1360-w1360-h1020"
                alt="Our shop"
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
              <div className="absolute -bottom-5 -right-5 bg-orange-500 text-white rounded-2xl p-5 shadow-xl">
                <div className="text-3xl font-black">20+</div>
                <div className="text-white/80 text-xs">Years of Trust</div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <span className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-3 block">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-5">
              Born in Ahmedabad, Trusted Across India
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Shree Krishna Vasan Bhandar was founded in 2005 with a single
              mission: to provide premium quality stainless steel kitchenware at
              fair prices. Starting from Raipur Darwaja — Ahmedabad's historic
              wholesale market — we grew steadily through word of mouth and
              commitment to quality.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Today we serve 500+ retailers across Gujarat and beyond, offering
              350+ products across cookware, dinnerware, storage, and accessories.
              Every item in our range is sourced from certified manufacturers and
              meets strict food-safety standards.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-400 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
            >
              Get in Touch →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-3 block">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                What We Stand For
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-lg transition text-center">
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-3 block">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">
              Milestones
            </h2>
          </div>
        </ScrollReveal>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-orange-100" />
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex items-start gap-6 pl-14 relative">
                  <div className="absolute left-4 w-5 h-5 rounded-full bg-orange-500 border-4 border-orange-100 -translate-x-1/2" />
                  <div>
                    <span className="text-orange-500 font-black text-lg">{m.year}</span>
                    <p className="text-gray-700 mt-1">{m.event}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-orange-600 to-amber-500 rounded-3xl p-10 text-center text-white shadow-2xl">
            <h2 className="text-3xl font-black mb-4">Ready to Partner With Us?</h2>
            <p className="text-white/80 mb-8">
              Become an authorized dealer and access exclusive wholesale pricing.
            </p>
            <Link
              href="/dealers"
              className="bg-white text-orange-600 px-8 py-3.5 rounded-xl font-bold shadow hover:bg-orange-50 transition inline-block"
            >
              Apply as Dealer →
            </Link>
          </div>
        </ScrollReveal>
      </section>

    </main>
  );
}