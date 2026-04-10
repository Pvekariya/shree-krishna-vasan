"use client";

import { motion } from "framer-motion";

interface Props {
  tag?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({ tag, title, subtitle, center = true }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${center ? "text-center" : ""}`}
    >
      {tag && (
        <span className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-3 block">
          {tag}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
      {subtitle && (
        <p className="text-gray-500 mt-3 text-base max-w-xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
}