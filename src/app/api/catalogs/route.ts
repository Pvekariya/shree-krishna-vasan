export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const catalogs = await db.collection("catalogs").find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(catalogs);
  } catch {
    return NextResponse.json({ error: "Failed to fetch catalogs" }, { status: 500 });
  }
}