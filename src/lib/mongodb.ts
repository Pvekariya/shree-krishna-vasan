import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("Missing MONGODB_URI in .env.local");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = new MongoClient(uri);
  await client.connect();

  // 🔥 IMPORTANT: database name must match Atlas
  const db = client.db("shree-krishna-vasan-bhandar");

  cachedClient = client;
  cachedDb = db;

  console.log("✅ MongoDB Connected (Vasan)");

  return db;
}