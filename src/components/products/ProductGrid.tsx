import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }: { products?: any[] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
      {products.map((product: any, i: number) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}