 "use client";

import { useState } from "react";

export type FiltersState = {
  city: string;
  sector: string;
  minROI?: number;
  maxRisk?: number;
};

type Props = {
  onChange: (filters: FiltersState) => void;
};

export function InvestmentFilters({ onChange }: Props) {
  const [city, setCity] = useState("");
  const [sector, setSector] = useState("");
  const [minROI, setMinROI] = useState<string>("");
  const [maxRisk, setMaxRisk] = useState<string>("");

  const emitChange = (
    next: Partial<FiltersState> & { city?: string; sector?: string }
  ) => {
    const filters: FiltersState = {
      city: next.city ?? city,
      sector: next.sector ?? sector,
      minROI:
        next.minROI ??
        (minROI ? Number(minROI) : undefined),
      maxRisk:
        next.maxRisk ??
        (maxRisk ? Number(maxRisk) : undefined)
    };
    onChange(filters);
  };

  return (
    <div className="grid md:grid-cols-4 gap-3 bg-white border rounded-xl p-3 text-sm">
      <input
        placeholder="المدينة"
        className="rounded border px-2 py-1"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          emitChange({ city: e.target.value });
        }}
      />
      <input
        placeholder="القطاع"
        className="rounded border px-2 py-1"
        value={sector}
        onChange={(e) => {
          setSector(e.target.value);
          emitChange({ sector: e.target.value });
        }}
      />
      <input
        type="number"
        placeholder="أدنى ROI %"
        className="rounded border px-2 py-1"
        value={minROI}
        onChange={(e) => {
          setMinROI(e.target.value);
          emitChange({ minROI: e.target.value ? Number(e.target.value) : undefined });
        }}
      />
      <input
        type="number"
        placeholder="أقصى مخاطرة"
        className="rounded border px-2 py-1"
        value={maxRisk}
        onChange={(e) => {
          setMaxRisk(e.target.value);
          emitChange({ maxRisk: e.target.value ? Number(e.target.value) : undefined });
        }}
      />
    </div>
  );
}

