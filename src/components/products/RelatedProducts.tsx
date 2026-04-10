"use client";

import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export default function RelatedProducts({ products }: { products: any[] }) {
  if (!products?.length) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <span className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-2 block">
          You May Also Like
        </span>
        <h2 className="text-2xl font-black text-gray-900">Related Products</h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}