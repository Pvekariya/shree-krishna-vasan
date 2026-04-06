import HomePageClient from "@/components/home/HomePageClient";

async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return <HomePageClient products={products} />;
}