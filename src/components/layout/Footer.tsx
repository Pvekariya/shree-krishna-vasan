"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin,  } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white mt-20">
      {/* TOP STRIP */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg">Ready to place a bulk order?</p>
            <p className="text-white/80 text-sm">
              Get exclusive dealer pricing and priority shipping.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href="/dealers"
              className="bg-white text-orange-600 px-6 py-2.5 rounded-xl font-semibold shadow-md hover:bg-orange-50 transition text-sm"
            >
              Become a Dealer →
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
        {/* BRAND */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-black text-sm">
              SK
            </div>
            <h2 className="font-bold text-lg">Shree Krishna Vasan Bhandar</h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
            Premium stainless steel utensils, cookware, and dinnerware. Trusted
            by 500+ retailers across Gujarat since 2005.
          </p>
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-orange-400 shrink-0" />
              <span>Shop No. 12, Raipur Darwaja, Ahmedabad – 380001</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-orange-400 shrink-0" />
              <a href="tel:+919999999999" className="hover:text-white transition">
                +91 99999 99999
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-orange-400 shrink-0" />
              <a
                href="mailto:info@skvb.in"
                className="hover:text-white transition"
              >
                info@skvb.in
              </a>
            </div>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-5 text-sm tracking-widest uppercase text-orange-400">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            {[
              { name: "Products", path: "/products" },
              { name: "Catalogs", path: "/catalogs" },
              { name: "Dealers", path: "/dealers" },
              { name: "About Us", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((l) => (
              <li key={l.name}>
                <Link
                  href={l.path}
                  className="hover:text-orange-400 transition"
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SOCIAL + HOURS */}
        <div>
          <h3 className="font-semibold mb-5 text-sm tracking-widest uppercase text-orange-400">
            Connect
          </h3>
          <div className="flex gap-3 mb-8">
      
          </div>
          <h3 className="font-semibold mb-3 text-sm tracking-widest uppercase text-orange-400">
            Shop Hours
          </h3>
          <p className="text-gray-400 text-sm">Mon–Sat: 9 AM – 8 PM</p>
          <p className="text-gray-400 text-sm">Sunday: 10 AM – 5 PM</p>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-gray-600 text-xs py-5">
        © 2026 Shree Krishna Vasan Bhandar. All rights reserved.
      </div>
    </footer>
  );
}