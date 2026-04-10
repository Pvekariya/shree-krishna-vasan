"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "./CartDrawer";

const links = [
  { name: "Products", path: "/products" },
  { name: "Catalogs", path: "/catalogs" },
  { name: "Dealers", path: "/dealers" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const count = useCartStore((s) => s.count());

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-8 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-md border-b border-orange-100"
            : "bg-white/70 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-black text-sm">
              SK
            </div>
            <span className="text-base font-bold text-gray-900 hidden sm:block tracking-tight">
              Shree Krishna Vasan Bhandar
            </span>
          </Link>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            {links.map((item, i) => (
              <motion.div key={i} whileHover={{ y: -2 }} className="relative group">
                <Link href={item.path} className="hover:text-orange-600 transition">
                  {item.name}
                </Link>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
              </motion.div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-orange-50 transition"
            >
              <ShoppingCart size={20} className="text-gray-700" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </motion.button>

            {/* CTA */}
            <motion.div whileHover={{ scale: 1.05 }} className="hidden md:block">
              <Link
                href="/dealers"
                className="bg-gradient-to-r from-orange-500 to-amber-400 text-white px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition text-sm font-medium"
              >
                Become Dealer
              </Link>
            </motion.div>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-orange-50"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-white border-t border-gray-100"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {links.map((item, i) => (
                  <Link
                    key={i}
                    href={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-gray-700 hover:text-orange-600 transition py-1"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/dealers"
                  onClick={() => setMobileOpen(false)}
                  className="bg-gradient-to-r from-orange-500 to-amber-400 text-white px-4 py-2 rounded-lg text-sm font-medium text-center"
                >
                  Become Dealer
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}