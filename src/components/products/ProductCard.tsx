"use client";

import Link from "next/link";

export default function ProductCard({ product }: any) {
  return (
    <Link
      href={`/products/${product._id}`}
      className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* subtle overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h2 className="font-semibold text-base md:text-lg text-gray-800 mb-1 line-clamp-1">
          {product.name}
        </h2>

        <p className="text-orange-600 font-bold text-lg">
          ₹{product.price}
        </p>

        {/* CTA */}
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition">
          <span className="text-sm text-orange-500 font-medium">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}