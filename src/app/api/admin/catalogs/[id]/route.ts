import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

// helper
function getToken(req: Request): string {
  return req.headers.get("authorization")?.replace("Bearer ", "") || "";
}

// DELETE catalog by ID
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    if (!verifyToken(getToken(req))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ FIX HERE
    const { id } = await context.params;

    const db = await getDb();

    await db
      .collection("catalogs")
      .deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete catalog" },
      { status: 500 }
    );
  }
}
