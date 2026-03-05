"use client";

import { FormEvent, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/Navigation";

async function syncUser(email: string, name?: string | null) {
  await fetch("/api/auth/sync-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name: name ?? undefined })
  });
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await syncUser(cred.user.email ?? "", cred.user.displayName);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("تعذر تسجيل الدخول. تحقق من البيانات.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      await syncUser(cred.user.email ?? "", cred.user.displayName);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("تعذر تسجيل الدخول عبر Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) return;
    setLoading(true);
    setError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await syncUser(cred.user.email ?? "", cred.user.displayName);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("تعذر إنشاء الحساب. جرّب بريدًا آخر.");
    } finally {
      setLoading(false);
    }
  };

  const locale: "ar" | "en" = "ar";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navigation locale={locale} />
      <main className="flex-1 container flex items-center justify-center py-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-4">
          <h1 className="text-xl font-bold text-center mb-2">تسجيل الدخول</h1>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">
              {error}
            </p>
          )}
          <form onSubmit={handleEmailLogin} className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm">البريد الإلكتروني</label>
              <input
                type="email"
                className="w-full rounded border px-3 py-2 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm">كلمة المرور</label>
              <input
                type="password"
                className="w-full rounded border px-3 py-2 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white rounded py-2 text-sm disabled:opacity-60"
            >
              {loading ? "جاري المعالجة..." : "تسجيل الدخول"}
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full border rounded py-2 text-sm disabled:opacity-60"
          >
            تسجيل الدخول عبر Google
          </button>

          <button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            className="w-full text-xs text-slate-600 underline"
          >
            لا تملك حساباً؟ إنشاء حساب جديد
          </button>
        </div>
      </main>
    </div>
  );
}

