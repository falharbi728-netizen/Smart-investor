# طريقة رفع مشروع Smart Investor إلى GitHub

اتبع هذه الخطوات بالترتيب داخل مجلد المشروع على جهازك.

## 1) فتح المجلد في الطرفية

افتح Terminal (أو PowerShell) ثم اكتب:

```bash
cd "c:\Users\Fahad22\Downloads\smart-investor"
```

## 2) تهيئة git لأول مرة

```bash
git init
git add .
git commit -m "Smart Investor initial commit"
```

## 3) إنشاء مستودع جديد في GitHub

1. ادخل موقع GitHub.
2. اضغط **New repository**.
3. سمّ الريبو: `smart-investor`
4. لا تُضف أي ملفات (لا README ولا .gitignore) من GitHub.
5. انسخ رابط الـ HTTPS للريبو، سيكون مثل:

```text
https://github.com/USERNAME/smart-investor.git
```

## 4) ربط المشروع المحلي بالريبو

غيّر USERNAME إلى اسم حسابك في GitHub، ثم نفّذ:

```bash
git branch -M main
git remote add origin https://github.com/USERNAME/smart-investor.git
git push -u origin main
```

بعد تنفيذ هذه الأوامر، سيكون مشروع **Smart Investor** مرفوعًا بالكامل على GitHub، ويمكنك بعدها ربطه مع Vercel للنشر.

