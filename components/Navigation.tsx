"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { messages } from "@/lib/i18n";

type Props = {
  locale: "ar" | "en";
};

export function Navigation({ locale }: Props) {
  const t = messages[locale];
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const switchLocale = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";
    router.push(`/${nextLocale}${pathname.replace(/^\/(ar|en)/, "")}`);
  };

  return (
    <header className="border-b bg-white sticky top-0 z-30">
      <nav className="container flex items-center justify-between py-3 gap-4">
        <Link href="/" className="font-bold text-lg">
          {t.appName}
        </Link>
        <button
          className="sm:hidden px-2 py-1 border rounded"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
        <div
          className={`flex-1 flex-col sm:flex-row sm:flex items-center justify-end gap-4 ${
            open ? "flex" : "hidden sm:flex"
          }`}
        >
          <Link href="/opportunities" className="hover:underline">
            {t.nav.listing}
          </Link>
          <Link href="/consultants" className="hover:underline">
            {t.nav.consultants}
          </Link>
          <Link href="/dashboard" className="hover:underline">
            {t.nav.dashboard}
          </Link>
          <Link href="/profile" className="hover:underline text-sm text-slate-600">
            الملف الشخصي
          </Link>
          <button
            onClick={switchLocale}
            className="px-3 py-1 border rounded text-sm"
          >
            {locale === "ar" ? "EN" : "AR"}
          </button>
          <Link
            href="/login"
            className="px-3 py-1 rounded bg-slate-900 text-white text-sm"
          >
            {t.nav.login}
          </Link>
        </div>
      </nav>
    </header>
  );
}

