import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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

    revalidatePath("/");
    revalidatePath("/products");

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}

// UPDATE product
export async function PUT(req: Request) {
  try {
    if (!verifyToken(getToken(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { _id, ...product } = body;

    if (!_id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const db = await getDb();

    const result = await db.collection("products").findOneAndUpdate(
      { _id: new ObjectId(_id) },
      {
        $set: {
          ...product,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (!result) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/products");

    return NextResponse.json({ success: true, product: result });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
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

    revalidatePath("/");
    revalidatePath("/products");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
