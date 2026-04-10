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
  const catalogs = await db
    .collection("catalogs")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json(catalogs);
}

export async function POST(req: Request) {
  if (!verifyToken(getToken(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = await getDb();
  const body = await req.json();
  const result = await db
    .collection("catalogs")
    .insertOne({ ...body, createdAt: new Date() });
  return NextResponse.json({ _id: result.insertedId, ...body }, { status: 201 });
}

export async function DELETE(req: Request) {
  if (!verifyToken(getToken(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = await getDb();
  const { id } = await req.json();
  await db.collection("catalogs").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}