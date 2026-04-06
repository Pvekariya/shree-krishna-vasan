import ProductGrid from "@/components/products/ProductGrid";
import Link from "next/link";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}

const categories = [
  {
    name: "Cookware",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },
  {
    name: "Storage",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
  },
  {
    name: "Dinner Set",
    image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707",
  },
  {
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba",
  },
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
    <main className="bg-gradient-to-br from-orange-50 via-yellow-50 to-white min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-16">

        {/* STEP 1: CATEGORY VIEW */}
        {!selectedCategory && (
          <>
            <h1 className="text-4xl font-bold text-orange-600 mb-10">
              Shop by Category
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/products?category=${cat.name}`}
                  className="group"
                >
                  <div className="relative h-[260px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-500">

                    <img
                      src={cat.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />

                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

                    <div className="absolute bottom-6 left-6 text-white">
                      <h2 className="text-xl font-semibold">
                        {cat.name}
                      </h2>
                      <p className="text-sm opacity-80">
                        Explore collection →
                      </p>
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* STEP 2: PRODUCT LIST UNDER CATEGORY */}
        {selectedCategory && (
          <>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-orange-600">
                {selectedCategory}
              </h1>

              <Link
                href="/products"
                className="text-sm text-gray-500 hover:text-orange-500"
              >
                ← Back
              </Link>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-xl text-gray-600">No products found</h2>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filtered.map((product: any) => (
                  <Link
                    key={product._id}
                    href={`/products/${product._id}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-500 border border-gray-100 relative">

                      {/* IMAGE */}
                      <div className="relative overflow-hidden">
                        <img
                          src={product.images?.[0]}
                          className="w-full h-48 object-cover group-hover:scale-110 transition duration-700"
                        />

                        {/* BADGE */}
                        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">
                          New
                        </span>
                      </div>

                      {/* CONTENT */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 line-clamp-1 group-hover:text-orange-600 transition">
                          {product.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Premium Quality
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <p className="text-orange-600 font-bold text-lg">
                            ₹{product.price}
                          </p>

                          <span className="text-xs text-gray-400 line-through">
                            ₹{product.price + 200}
                          </span>
                        </div>

                        {/* ACTION */}
                        <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                          {/* ADD TO CART */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              console.log("Add to cart:", product);
                            }}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition"
                          >
                            Add
                          </button>

                          {/* QUICK VIEW */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              window.location.href = `/products/${product._id}`;
                            }}
                            className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 rounded-lg text-sm font-medium transition"
                          >
                            View
                          </button>
                        </div>
                      </div>

                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

      </section>
    </main>
  );
}
