import { Navigation } from "@/components/Navigation";
import { messages } from "@/lib/i18n";

export default function HomePage() {
  const locale: "ar" | "en" = "ar";
  const t = messages[locale];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navigation locale={locale} />
      <main className="container flex-1 py-10 space-y-10">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">{t.appName}</h1>
            <p className="text-slate-700">{t.tagline}</p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm">
                رؤية السعودية 2030
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                Logistics · Tourism · Tech
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-5">
            <p className="font-semibold mb-2">
              لوحة ذكية لفرص الاستثمار في السعودية
            </p>
            <p className="text-sm text-slate-700">
              هذه نسخة أولية (MVP) من المنصة تحتوي على البنية الأساسية:
              الفرص، المستشارون، الرسائل، واللوحات المختلفة للمستثمر،
              المستشار، والمدير.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

