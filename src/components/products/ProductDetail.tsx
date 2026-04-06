"use client";

import { useState } from "react";

export default function ProductDetail({ product }: { product: any }) {
  const images = product.images || [];
  const [index, setIndex] = useState(0);

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 p-6">

      {/* LEFT - IMAGES */}
      <div>
        <div className="rounded-xl overflow-hidden border">
          <img
            src={images[index] || images[0]}
            className="w-full h-[400px] object-cover"
          />
        </div>

        <div className="flex gap-3 mt-4">
          {images.map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              onClick={() => setIndex(i)}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                index === i ? "border-orange-500" : "border-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT - INFO */}
      <div className="space-y-5">

        <h1 className="text-3xl font-bold text-gray-800">
          {product.name}
        </h1>

        <p className="text-xl text-orange-600 font-semibold">
          ₹{product.price}
        </p>

        <p className="text-gray-600">
          Premium quality kitchen product built for durability and daily use.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-6">

          <button
            onClick={() => console.log("Add to cart", product)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-lg"
          >
            Add to Cart
          </button>

          <button
            onClick={() => console.log("Buy now", product)}
            className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-lg"
          >
            Buy Now
          </button>

        </div>

      </div>

    </div>
  );
}