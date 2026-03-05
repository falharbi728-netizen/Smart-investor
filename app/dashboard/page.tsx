"use client";

import { useAuth } from "@/components/AuthProvider";
import { Navigation } from "@/components/Navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const locale: "ar" | "en" = "ar";

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        جاري التحقق من الحساب...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navigation locale={locale} />
      <main className="container flex-1 py-8 space-y-6">
        <h1 className="text-2xl font-bold">لوحة التحكم</h1>
        <p className="text-sm text-slate-600">
          هذه نسخة مبسطة من لوحة التحكم، يمكن تقسيمها لاحقاً حسب دور المستخدم
          (مستثمر / مستشار / مدير) بعد ربطها بدور المستخدم من قاعدة البيانات.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border p-4">
            <h2 className="font-semibold mb-2">المستثمر</h2>
            <p className="text-sm text-slate-600">
              حفظ الفرص، متابعة الرسائل، وإشعارات النشاط.
            </p>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <h2 className="font-semibold mb-2">المستشار</h2>
            <p className="text-sm text-slate-600">
              رفع دراسات الجدوى، إدارة الفرص، والرد على المستثمرين.
            </p>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <h2 className="font-semibold mb-2">المدير</h2>
            <p className="text-sm text-slate-600">
              إدارة المستخدمين، مراجعة الفرص، وتحقق المستشارين.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

