import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const db = await getDb();

    const body = await req.json();

    const result = await db.collection("orders").insertOne(body);

    const order = {
      _id: result.insertedId,
      ...body,
    };

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.log("ORDER ERROR:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}