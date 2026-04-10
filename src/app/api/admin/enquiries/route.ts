export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import { ObjectId } from "mongodb";

function getToken(req: Request) {
  return req.headers.get("authorization")?.replace("Bearer ", "") || "";
}

export async function GET(req: Request) {
  if (!verifyToken(getToken(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = await getDb();
  const enquiries = await db
    .collection("enquiries")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json(enquiries);
}

export async function DELETE(req: Request) {
  if (!verifyToken(getToken(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = await getDb();
  const { id } = await req.json();
  await db.collection("enquiries").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}