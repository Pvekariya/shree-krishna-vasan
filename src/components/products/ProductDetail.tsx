"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, MessageCircle, Share2, Check, ChevronLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function ProductDetail({ product }: { product: any }) {
  const images = product.images || [];
  const [idx, setIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: images[0],
      });
    }
    setAdded(true);
    toast.success("Added to cart!");
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsApp = () => {
    const msg = `Hi, I'm interested in *${product.name}* (₹${product.price}). Please share more details.`;
    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 md:px-6">
      {/* BACK */}
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange-500 transition mb-8"
      >
        <ChevronLeft size={16} />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* IMAGES */}
        <div>
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50"
          >
            <img
              src={images[idx] || images[0]}
              alt={product.name}
              className="w-full h-[400px] md:h-[480px] object-cover"
            />
          </motion.div>
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
              {images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`shrink-0 rounded-xl overflow-hidden border-2 transition ${
                    idx === i ? "border-orange-500" : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-20 h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFO */}
        <div>
          <div className="inline-block bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
            {product.category || "Kitchen"}
          </div>

          <h1 className="text-3xl font-black text-gray-900 mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-black text-orange-600">
              {formatPrice(product.price)}
            </span>
            <span className="text-lg text-gray-400 line-through">
              {formatPrice(product.price + 200)}
            </span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
              Save ₹200
            </span>
          </div>

          {product.description && (
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>
          )}

          {product.features && product.features.length > 0 && (
            <ul className="space-y-2 mb-8">
              {product.features.map((f: string, i: number) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check size={14} className="text-orange-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          )}

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-gray-600">Qty:</span>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-2 hover:bg-gray-50 text-lg font-bold transition"
              >
                −
              </button>
              <span className="w-10 text-center font-bold text-sm">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-2 hover:bg-gray-50 text-lg font-bold transition"
              >
                +
              </button>
            </div>
            {product.stock !== undefined && (
              <span className="text-xs text-gray-400">
                {product.stock} in stock
              </span>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 mb-6">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className={`flex-1 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-md hover:opacity-90"
              }`}
            >
              {added ? (
                <>
                  <Check size={18} /> Added!
                </>
              ) : (
                <>
                  <ShoppingBag size={18} /> Add to Cart
                </>
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleWhatsApp}
              className="flex-1 py-3.5 rounded-xl font-semibold border border-gray-200 text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <MessageCircle size={18} className="text-green-500" />
              Enquire
            </motion.button>
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Link copied!");
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition"
          >
            <Share2 size={14} />
            Share Product
          </button>

          {/* TRUST BADGES */}
          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            {[
              { icon: "🚚", label: "Free Shipping", sub: "Above ₹2000" },
              { icon: "✅", label: "ISI Certified", sub: "Quality Assured" },
              { icon: "↩️", label: "Easy Returns", sub: "7-day policy" },
            ].map((b, i) => (
              <div key={i} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="text-xl mb-1">{b.icon}</div>
                <div className="text-xs font-bold text-gray-700">{b.label}</div>
                <div className="text-[10px] text-gray-400">{b.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}