import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = params;
  const messages = await prisma.message.findMany({
    where: { opportunityId: id },
    orderBy: { createdAt: "asc" },
    include: {
      sender: true
    }
  });

  return NextResponse.json(
    messages.map((m) => ({
      id: m.id,
      content: m.content,
      createdAt: m.createdAt,
      senderEmail: m.sender.email
    }))
  );
}

export async function POST(req: NextRequest, { params }: Params) {
  const { id } = params;
  const { content, senderEmail } = (await req.json()) as {
    content?: string;
    senderEmail?: string | null;
  };

  if (!content || !senderEmail) {
    return NextResponse.json(
      { error: "Missing content or senderEmail" },
      { status: 400 }
    );
  }

  const sender = await prisma.user.findUnique({
    where: { email: senderEmail }
  });

  if (!sender) {
    return NextResponse.json({ error: "Sender not found" }, { status: 404 });
  }

  const opportunity = await prisma.opportunity.findUnique({
    where: { id },
    include: { owner: true }
  });

  if (!opportunity) {
    return NextResponse.json({ error: "Opportunity not found" }, { status: 404 });
  }

  // MVP: إذا كان المرسل ليس المالك، نوجه الرسالة إلى المالك (المستشار)
  if (sender.id === opportunity.ownerId) {
    return NextResponse.json(
      { error: "Owner messaging logic not implemented in MVP" },
      { status: 400 }
    );
  }

  const message = await prisma.message.create({
    data: {
      content,
      senderId: sender.id,
      recipientId: opportunity.ownerId,
      opportunityId: opportunity.id
    }
  });

  return NextResponse.json(message, { status: 201 });
}

