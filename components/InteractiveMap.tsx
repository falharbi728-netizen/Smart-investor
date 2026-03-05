"use client";

type Props = {
  city: string;
};

const cityCenter: Record<string, { lat: number; lng: number }> = {
  Riyadh: { lat: 24.7136, lng: 46.6753 },
  Jeddah: { lat: 21.4858, lng: 39.1925 },
  Dammam: { lat: 26.3927, lng: 49.9777 }
};

export function InteractiveMap({ city }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const center = cityCenter[city] ?? cityCenter.Riyadh;

  if (!apiKey) {
    return (
      <div className="w-full h-64 rounded-xl border bg-slate-100 flex items-center justify-center text-xs text-slate-600">
        أضف مفتاح Google Maps في متغير NEXT_PUBLIC_GOOGLE_MAPS_API_KEY لعرض الخريطة هنا.
      </div>
    );
  }

  const src = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${center.lat},${center.lng}&zoom=11&maptype=roadmap`;

  return (
    <div className="w-full h-64 rounded-xl overflow-hidden border">
      <iframe
        title={`Map of ${city}`}
        width="100%"
        height="100%"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={src}
      />
    </div>
  );
}

