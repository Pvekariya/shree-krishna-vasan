import ProductDetail from "@/components/products/ProductDetail";

async function getProduct(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/products/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="p-6">
      <ProductDetail product={product} />
    </div>
  );
}