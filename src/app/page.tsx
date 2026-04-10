import HomePageClient from "@/components/home/HomePageClient";
import { getSiteUrl } from "@/lib/site-url";

async function getProducts() {
  const siteUrl = await getSiteUrl();
  const res = await fetch(`${siteUrl}/api/products`, { cache: "no-store" });

  if (!res.ok) return [];

  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return <HomePageClient products={products} />;
}
