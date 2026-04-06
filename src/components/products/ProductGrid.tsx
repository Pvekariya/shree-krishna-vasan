import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }: { products?: any[] }) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {products.map((product: any) => (
        <div
          key={product._id}
          className="group transition-transform duration-300 hover:-translate-y-1"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}