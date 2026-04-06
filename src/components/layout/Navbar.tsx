"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-gradient-to-r from-orange-50/80 to-yellow-50/80 border-b border-orange-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/" className="text-xl font-bold tracking-tight text-orange-600">
            Shree Krishna Vasan Bhandar
          </Link>
        </motion.div>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[
            { name: "Products", path: "/products" },
            { name: "Catalogs", path: "/catalogs" },
            { name: "Dealers", path: "/dealers" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="relative group"
            >
              <Link href={item.path} className="hover:text-orange-600 transition">
                {item.name}
              </Link>

              {/* underline animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-500 transition-all group-hover:w-full"></span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            href="/products"
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition"
          >
            Explore
          </Link>
        </motion.div>

      </div>
    </motion.nav>
  );
}