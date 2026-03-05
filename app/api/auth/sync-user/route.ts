import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name } = body as { email?: string; name?: string };

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { email },
      update: { name: name ?? undefined },
      create: {
        email,
        name,
        role: UserRole.INVESTOR
      }
    });

    return NextResponse.json({ id: user.id, role: user.role });
  } catch (error) {
    console.error("sync-user error", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

