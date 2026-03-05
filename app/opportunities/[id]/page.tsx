import { prisma } from "@/lib/prisma";
import { Navigation } from "@/components/Navigation";
import { InteractiveMap } from "@/components/InteractiveMap";
import { MessagingInterface } from "@/components/MessagingInterface";

type Props = {
  params: {
    id: string;
  };
};

export default async function OpportunityDetailsPage({ params }: Props) {
  const { id } = params;
  const locale: "ar" | "en" = "ar";

  const opportunity = await prisma.opportunity.findUnique({
    where: { id },
    include: {
      feasibilityStudies: true,
      media: true,
      owner: true
    }
  });

  if (!opportunity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        لم يتم العثور على الفرصة.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navigation locale={locale} />
      <main className="container flex-1 py-8 space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold">{opportunity.title}</h1>
          <p className="text-sm text-slate-600">
            {opportunity.city} · {opportunity.sector}
          </p>
        </header>

        <section className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border p-4 space-y-2 text-sm">
              <h2 className="font-semibold mb-1">وصف الفرصة</h2>
              <p>{opportunity.description}</p>
            </div>

            <div className="bg-white rounded-xl border p-4 grid grid-cols-3 gap-3 text-xs">
              <div>
                <p className="text-slate-500">تكلفة الاستثمار</p>
                <p className="font-semibold">
                  {opportunity.investmentCost.toLocaleString("en-US")} SAR
                </p>
              </div>
              <div>
                <p className="text-slate-500">العائد المتوقع</p>
                <p className="font-semibold">{opportunity.expectedROI}%</p>
              </div>
              <div>
                <p className="text-slate-500">المخاطرة</p>
                <p className="font-semibold">{opportunity.riskLevel} / 5</p>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-semibold text-sm">الخريطة</h2>
              <InteractiveMap city={opportunity.city} />
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white rounded-xl border p-3 text-sm">
              <h2 className="font-semibold mb-1">المستشار</h2>
              <p>{opportunity.owner.name ?? opportunity.owner.email}</p>
            </div>

            <div className="bg-white rounded-xl border p-3 text-sm space-y-2">
              <h2 className="font-semibold text-sm">دراسات الجدوى</h2>
              {opportunity.feasibilityStudies.length === 0 && (
                <p className="text-xs text-slate-600">لا توجد دراسات حالياً.</p>
              )}
              {opportunity.feasibilityStudies.map((fs) => (
                <div key={fs.id} className="space-y-1 text-xs">
                  <a
                    href={fs.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    فتح دراسة الجدوى
                  </a>
                  {fs.aiSummary && (
                    <p className="text-slate-600">
                      <span className="font-semibold">ملخص ذكي:</span>{" "}
                      {fs.aiSummary}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <MessagingInterface opportunityId={opportunity.id} />
          </div>
        </section>
      </main>
    </div>
  );
}

