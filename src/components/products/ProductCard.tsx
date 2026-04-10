"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({ product }: any) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-orange-200 hover:shadow-xl transition-all duration-300">
      {/* IMAGE */}
      <Link href={`/products/${product._id}`}>
        <div className="relative overflow-hidden bg-gray-50">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition duration-700"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
            {product.category || "New"}
          </span>
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h2 className="font-semibold text-sm text-gray-800 line-clamp-2 group-hover:text-orange-600 transition mb-2 min-h-[2.5rem]">
            {product.name}
          </h2>
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-orange-600 font-black text-base">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-gray-400 line-through">
            {formatPrice(product.price + 200)}
          </span>
        </div>

        {/* ACTIONS — visible on hover */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              addItem({
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.images?.[0],
              });
              toast.success("Added to cart!");
            }}
            className="flex-1 bg-gradient-to-r from-orange-500 to-amber-400 text-white py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90 transition"
          >
            <ShoppingBag size={12} />
            Add
          </motion.button>

          <Link
            href={`/products/${product._id}`}
            className="px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:border-orange-300 hover:text-orange-500 transition flex items-center"
          >
            <Eye size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}