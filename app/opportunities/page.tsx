import { prisma } from "@/lib/prisma";
import { Navigation } from "@/components/Navigation";
import { OpportunityCard } from "@/components/OpportunityCard";

export default async function OpportunitiesPage() {
  const locale: "ar" | "en" = "ar";
  const opportunities = await prisma.opportunity.findMany({
    orderBy: { createdAt: "desc" },
    take: 12
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navigation locale={locale} />
      <main className="container flex-1 py-8 space-y-4">
        <header className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-2xl font-bold">الفرص الاستثمارية</h1>
            <p className="text-sm text-slate-600">
              عرض سريع لأحدث الفرص المتاحة في السعودية.
            </p>
          </div>
        </header>
        <section className="grid md:grid-cols-3 gap-4">
          {opportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              title={opp.title}
              city={opp.city}
              sector={opp.sector}
              investmentCost={opp.investmentCost}
              expectedROI={opp.expectedROI}
              riskLevel={opp.riskLevel}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

