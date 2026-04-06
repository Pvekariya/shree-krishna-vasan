"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            Shree Krishna Vasan
          </h2>
          <p className="text-gray-400">
            Premium stainless steel utensils supplier in Ahmedabad.
          </p>
        </div>

        {/* LINKS */}
        <div className="flex flex-col gap-3">
          <Link href="/products">Products</Link>
          <Link href="/catalogs">Catalogs</Link>
          <Link href="/dealers">Dealers</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* CTA */}
        <div>
          <p className="mb-4">Need bulk orders?</p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/dealers"
            className="bg-white text-black px-5 py-2 rounded-lg inline-block"
          >
            Become Dealer
          </motion.a>
        </div>

      </div>

      <div className="text-center text-gray-500 pb-6">
        © 2026 Shree Krishna Vasan Bhandar
      </div>

    </footer>
  );
}