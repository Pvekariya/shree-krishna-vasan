import HomePageClient from "@/components/home/HomePageClient";
import { getDb } from "@/lib/mongodb";

async function getProducts() {
  try {
    const db = await getDb();
    return await db
      .collection("products")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
  } catch {
    return [];
  }
}

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getProducts();

  return <HomePageClient products={products} />;
}
