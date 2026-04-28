export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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
  const title = body.title?.trim();
  const pdfUrl = body.pdfUrl?.trim();

  if (!title || !pdfUrl) {
    return NextResponse.json(
      { error: "Title and PDF URL are required" },
      { status: 400 }
    );
  }

  const catalog = {
    title,
    pdfUrl,
    coverImage: body.coverImage?.trim() || "",
    createdAt: new Date(),
  };

  const result = await db
    .collection("catalogs")
    .insertOne(catalog);

  revalidatePath("/catalogs");
  revalidatePath("/");

  return NextResponse.json(
    { _id: result.insertedId, ...catalog },
    { status: 201 }
  );
}

export async function DELETE(req: Request) {
  if (!verifyToken(getToken(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = await getDb();
  const { id } = await req.json();
  await db.collection("catalogs").deleteOne({ _id: new ObjectId(id) });

  revalidatePath("/catalogs");
  revalidatePath("/");

  return NextResponse.json({ success: true });
}
