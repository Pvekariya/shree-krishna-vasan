import ProductDetail from "@/components/products/ProductDetail";
import RelatedProducts from "@/components/products/RelatedProducts";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function getProduct(id: string) {
  const res = await fetch(`${BASE}/api/products/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

async function getAllProducts() {
  const res = await fetch(`${BASE}/api/products`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);
  const allProducts = await getAllProducts();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Product not found</h1>
          <a href="/products" className="text-orange-500 hover:underline text-sm">
            ← Back to Products
          </a>
        </div>
      </div>
    );
  }

  const related = allProducts
    .filter(
      (p: any) =>
        p._id !== product._id &&
        p.category === product.category
    )
    .slice(0, 4);

  return (
    <main className="bg-white min-h-screen">
      <ProductDetail product={product} />
      {related.length > 0 && (
        <div className="border-t border-gray-100 mt-4">
          <RelatedProducts products={related} />
        </div>
      )}
    </main>
  );
}