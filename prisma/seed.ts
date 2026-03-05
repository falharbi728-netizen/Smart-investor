import { PrismaClient, UserRole, MediaType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const investor = await prisma.user.upsert({
    where: { email: "investor@example.com" },
    update: {},
    create: {
      email: "investor@example.com",
      name: "Test Investor",
      role: UserRole.INVESTOR
    }
  });

  const consultant = await prisma.user.upsert({
    where: { email: "consultant@example.com" },
    update: {},
    create: {
      email: "consultant@example.com",
      name: "Test Consultant",
      role: UserRole.CONSULTANT
    }
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      role: UserRole.ADMIN
    }
  });

  const opportunity = await prisma.opportunity.create({
    data: {
      title: "مركز لوجستي في الرياض",
      description: "فرصة استثمارية في قطاع الخدمات اللوجستية متوافقة مع رؤية 2030.",
      city: "Riyadh",
      sector: "Logistics",
      investmentCost: 5000000,
      expectedROI: 18,
      riskLevel: 3,
      smartScore: 82,
      ownerId: consultant.id
    }
  });

  await prisma.opportunityMedia.createMany({
    data: [
      {
        opportunityId: opportunity.id,
        type: MediaType.IMAGE,
        url: "/images/opportunities/logistics-center.jpg"
      }
    ]
  });

  await prisma.feasibilityStudy.create({
    data: {
      opportunityId: opportunity.id,
      consultantId: consultant.id,
      fileUrl: "https://example.com/sample-feasibility.pdf",
      aiSummary: "ملخص مبدئي لدراسة الجدوى لهذه الفرصة الاستثمارية."
    }
  });

  await prisma.favorite.create({
    data: {
      userId: investor.id,
      opportunityId: opportunity.id
    }
  });

  await prisma.review.create({
    data: {
      userId: investor.id,
      opportunityId: opportunity.id,
      rating: 5,
      comment: "فرصة واعدة في قطاع مهم ضمن رؤية 2030."
    }
  });

  await prisma.message.create({
    data: {
      content: "مرحباً، أود معرفة المزيد عن تفاصيل العائد المتوقع.",
      senderId: investor.id,
      recipientId: consultant.id,
      opportunityId: opportunity.id
    }
  });

  console.log("Seed data created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

