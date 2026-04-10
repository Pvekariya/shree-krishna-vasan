import ProductGrid from "@/components/products/ProductGrid";
import { getSiteUrl } from "@/lib/site-url";
import Link from "next/link";

async function getProducts() {
  const siteUrl = await getSiteUrl();
  const res = await fetch(`${siteUrl}/api/products`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

const categories = [
  { name: "Cookware", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80", desc: "Kadhai, pans & more" },
  { name: "Storage", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&q=80", desc: "Containers & bottles" },
  { name: "Dinner Set", image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400&q=80", desc: "Plates, bowls & thali" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80", desc: "Tools & serving items" },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params?.category;
  const products = (await getProducts()) || [];

  const filtered = selectedCategory
    ? products.filter(
        (p: any) =>
          (p.category || "").toLowerCase() === selectedCategory.toLowerCase()
      )
    : [];

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-white">
      <section className="max-w-7xl mx-auto px-6 py-14">

        {/* CATEGORY VIEW */}
        {!selectedCategory && (
          <>
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-widest uppercase text-orange-500 mb-3 block">
                Collections
              </span>
              <h1 className="text-4xl font-black text-gray-900">
                Shop by Category
              </h1>
              <p className="text-gray-500 mt-3 max-w-md mx-auto">
                Browse our full range of premium stainless steel kitchenware
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/products?category=${cat.name}`}
                  className="group"
                >
                  <div className="relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-500">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h2 className="text-xl font-bold">{cat.name}</h2>
                      <p className="text-white/70 text-xs">{cat.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* PRODUCT LIST */}
        {selectedCategory && (
          <>
            <div className="flex items-center justify-between mb-10">
              <div>
                <Link
                  href="/products"
                  className="text-sm text-gray-400 hover:text-orange-500 transition mb-2 inline-flex items-center gap-1"
                >
                  ← All Categories
                </Link>
                <h1 className="text-3xl font-black text-gray-900">
                  {selectedCategory}
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  {filtered.length} products found
                </p>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">📦</div>
                <h2 className="text-xl font-bold text-gray-600 mb-2">
                  No products yet
                </h2>
                <p className="text-gray-400 text-sm">
                  Check back soon — new items are being added!
                </p>
              </div>
            ) : (
              <ProductGrid products={filtered} />
            )}
          </>
        )}
      </section>
    </main>
  );
}
