import { calculateSmartInvestmentScore } from "@/lib/smartFeatures";

type Props = {
  title: string;
  city: string;
  sector: string;
  investmentCost: number;
  expectedROI: number;
  riskLevel: number;
};

export function OpportunityCard(props: Props) {
  const smartScore = calculateSmartInvestmentScore({
    roi: props.expectedROI,
    risk: props.riskLevel,
    sectorGrowth: 3,
    locationDemand: 3
  });

  return (
    <article className="rounded-xl border bg-white p-4 shadow-sm space-y-2">
      <header className="flex items-center justify-between gap-2">
        <h3 className="font-semibold">{props.title}</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">
          Smart Score: {smartScore}
        </span>
      </header>
      <p className="text-xs text-slate-600">
        {props.city} · {props.sector}
      </p>
      <dl className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <dt className="text-slate-500">تكلفة الاستثمار</dt>
          <dd className="font-semibold">
            {props.investmentCost.toLocaleString("en-US")} SAR
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">العائد المتوقع</dt>
          <dd className="font-semibold">{props.expectedROI}%</dd>
        </div>
        <div>
          <dt className="text-slate-500">المخاطرة</dt>
          <dd className="font-semibold">{props.riskLevel} / 5</dd>
        </div>
      </dl>
    </article>
  );
}

