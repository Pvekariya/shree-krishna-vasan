import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

// helper
function getToken(req: Request): string {
  return req.headers.get("authorization")?.replace("Bearer ", "") || "";
}

// GET all products
export async function GET(req: Request) {
  try {
    if (!verifyToken(getToken(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();

    const products = await db
      .collection("products")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ADD product
export async function POST(req: Request) {
  try {
    if (!verifyToken(getToken(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const db = await getDb();

    const result = await db.collection("products").insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(req: Request) {
  try {
    if (!verifyToken(getToken(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const db = await getDb();

    await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}