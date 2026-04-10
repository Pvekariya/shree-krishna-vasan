"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQty, total, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-white px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <ShoppingBag size={64} className="mx-auto text-orange-200 mb-6" />
          <h1 className="text-2xl font-black text-gray-800 mb-3">
            Your cart is empty
          </h1>
          <p className="text-gray-500 mb-8 text-sm">
            Add some products to get started
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-400 text-white px-7 py-3.5 rounded-xl font-semibold shadow-md"
          >
            Browse Products <ArrowRight size={16} />
          </Link>
        </motion.div>
      </main>
    );
  }

  const subtotal = total();
  const shipping = subtotal >= 2000 ? 0 : 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-black text-gray-900">
            Shopping Cart
            <span className="text-orange-500 ml-2 text-2xl">({items.length})</span>
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-gray-400 hover:text-red-500 transition flex items-center gap-1.5"
          >
            <Trash2 size={14} /> Clear All
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-5 bg-white rounded-2xl p-4 border border-gray-100 hover:border-orange-100 shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 mb-1 truncate">
                      {item.name}
                    </h3>
                    <p className="text-orange-600 font-black text-lg">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => updateQty(item._id, item.quantity - 1)}
                          className="px-3 py-1.5 hover:bg-gray-50 transition"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-9 text-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item._id, item.quantity + 1)}
                          className="px-3 py-1.5 hover:bg-gray-50 transition"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm text-gray-400">
                        = {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="ml-auto text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-28">
              <h2 className="font-bold text-lg text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? "text-green-600" : ""}`}>
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-orange-500">
                    Add {formatPrice(2000 - subtotal)} more for free shipping
                  </p>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between font-black text-gray-900 text-base">
                  <span>Total</span>
                  <span>{formatPrice(subtotal + shipping)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full block bg-gradient-to-r from-orange-500 to-amber-400 text-white text-center py-3.5 rounded-xl font-bold shadow-md hover:opacity-90 transition"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/products"
                className="w-full block text-center text-sm text-gray-500 mt-4 hover:text-orange-500 transition"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}