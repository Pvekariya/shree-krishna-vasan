import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const db = await getDb();
    const body = await req.json();
    const result = await db.collection("enquiries").insertOne(body);
    const enquiry = {
      _id: result.insertedId,
      ...body,
    };
    return NextResponse.json(enquiry, { status: 201 });
  } catch (error) {
    console.log("ENQUIRY ERROR:", error);
    return NextResponse.json({ error: "Failed to send enquiry" }, { status: 500 });
  }
}