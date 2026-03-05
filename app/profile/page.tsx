"use client";

import { useAuth } from "@/components/AuthProvider";
import { Navigation } from "@/components/Navigation";
import { sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const locale: "ar" | "en" = "ar";

  if (!loading && !user) {
    router.push("/login");
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    setStatus(null);
    try {
      await updateProfile(user, { displayName });
      setStatus("تم تحديث البيانات بنجاح.");
    } catch (error) {
      console.error(error);
      setStatus("تعذر تحديث البيانات.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    setSubmitting(true);
    setStatus(null);
    try {
      await sendPasswordResetEmail(auth, user.email);
      setStatus("تم إرسال رابط تغيير كلمة المرور إلى بريدك الإلكتروني.");
    } catch (error) {
      console.error(error);
      setStatus("تعذر إرسال رابط تغيير كلمة المرور.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navigation locale={locale} />
      <main className="container flex-1 py-8 max-w-xl space-y-4">
        <h1 className="text-2xl font-bold mb-2">الملف الشخصي</h1>
        {status && (
          <p className="text-sm px-3 py-2 rounded bg-slate-100 text-slate-700">
            {status}
          </p>
        )}
        <form onSubmit={handleSave} className="space-y-4 bg-white rounded-xl border p-4">
          <div className="space-y-1">
            <label className="text-sm text-slate-700">البريد الإلكتروني</label>
            <input
              type="email"
              value={user?.email ?? ""}
              disabled
              className="w-full rounded border px-3 py-2 text-sm bg-slate-100"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-slate-700">الاسم</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded border px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded bg-slate-900 text-white text-sm disabled:opacity-60"
          >
            حفظ التغييرات
          </button>
        </form>
        <div className="bg-white rounded-xl border p-4 space-y-2">
          <h2 className="font-semibold mb-1 text-sm">كلمة المرور</h2>
          <p className="text-xs text-slate-600">
            لتغيير كلمة المرور، سيتم إرسال رابط إعادة تعيين إلى بريدك الإلكتروني.
          </p>
          <button
            type="button"
            onClick={handlePasswordReset}
            disabled={submitting}
            className="px-4 py-2 rounded border text-sm disabled:opacity-60"
          >
            إرسال رابط تغيير كلمة المرور
          </button>
        </div>
      </main>
    </div>
  );
}

