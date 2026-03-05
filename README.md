# Smart Investor (المستثمر الذكي)

منصة (MVP) لربط المستثمرين بالفرص الاستثمارية في السعودية، مع دعم تسجيل الدخول بالبريد، عرض الفرص، تفاصيل الفرصة مع خريطة، دراسات جدوى، ومراسلة بين المستثمر والمستشار.

An MVP platform connecting investors with investment opportunities in Saudi Arabia, with email auth, listings, opportunity details with map, feasibility studies, and messaging between investor and consultant.

---

## 🏗️ Tech Stack

- Next.js 14 (App Router) + TypeScript  
- Tailwind CSS  
- TanStack Query (React Query)  
- Prisma + PostgreSQL  
- Firebase Authentication + Storage (client config)  
- Google Maps Embed (optional)  
- Zod (ready to use for validation)  

---

## 🚀 Getting Started (Local)

### 1. Install dependencies

```bash
cd smart-investor
npm install
```

### 2. Configure environment variables

Create `.env.local` in the root and copy from `.env.example`, then fill:

- `DATABASE_URL` → from Supabase / Neon / Railway Postgres
- `NEXT_PUBLIC_FIREBASE_*` → from your Firebase project (Web app)
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` → optional, for the map embed

### 3. Setup database (Prisma + seed)

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```

### 4. Run dev server

```bash
npm run dev
```

Open `http://localhost:3000`.

---

## 🔐 Auth (Email & Password)

- `/login`:
  - Sign in with **email + password**.
  - Register new account (email/password) using Firebase Auth.
  - On success:
    - User is upserted into PostgreSQL via `POST /api/auth/sync-user`.
    - Redirected to `/dashboard`.
- `/profile`:
  - View email (read-only).
  - Update display name.
  - Send password reset email (Firebase) to change password.

---

## 🧩 Core Pages & Features

- `/` (Home): Landing page in Arabic.
- `/opportunities`: Public listing of opportunities (from Prisma).
- `/opportunities/[id]`: Opportunity details:
  - Description, financials, risk.
  - **InteractiveMap** (Google Maps embed by city).
  - Feasibility studies (PDF links + AI summary placeholder).
  - **MessagingInterface**: investor ↔ consultant (owner).
- `/consultants`: placeholder, ready for a consultants directory.
- `/dashboard`: simple dashboard shell (investor / consultant / admin concept).

---

## 💬 Messaging

- API: `GET/POST /api/opportunities/[id]/messages`
  - `GET`: list messages for an opportunity, with sender email.
  - `POST`: create new message from logged-in user (investor) to opportunity owner (consultant).
- UI: `components/MessagingInterface.tsx`
  - Uses TanStack Query to load messages and send new ones.

---

## 🧠 Smart Features (MVP)

- `lib/smartFeatures.ts`:
  - `calculateSmartInvestmentScore`:
    - Combines ROI, risk, sector growth, and location demand into a 0–100 score.
  - `scoreOpportunityForInvestor`:
    - Scores an opportunity based on investor preferences (budget, cities, sectors, ROI, risk).
- Used in `OpportunityCard` to show **Smart Score**.

---

## 🗺️ Maps

- `components/InteractiveMap.tsx`:
  - Uses Google Maps Embed API.
  - Centers on a city (Riyadh, Jeddah, Dammam, etc.).
  - Requires `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to render the map.

---

## 🧪 Tests

- Vitest config: `vitest.config.ts`.
- Example tests: `tests/smartFeatures.test.ts`:
  - Validate Smart Investment Score and recommendation scoring.

Run:

```bash
npm run test
```

---

## 📦 Deployment

### Vercel

- `vercel.json` is included.
- Steps:
  1. Push project to GitHub/GitLab.
  2. Import repo in Vercel.
  3. Add environment variables (same as `.env.local`).
  4. Deploy.

### Railway (Docker)

- `Dockerfile` + `railway.json` included.
- Steps:
  1. Create a new service from repo in Railway (Docker build).
  2. Add PostgreSQL plugin → copy `DATABASE_URL`.
  3. Set all environment variables.
  4. Deploy and open the generated URL.

---

## 📌 Notes / Next Steps

- Add full RBAC (INVESTOR / CONSULTANT / ADMIN) on dashboards and APIs.
- Replace AI summary placeholder with a real LLM integration.
- Build full consultants directory + ratings + opportunity management UI.
- Add full AR/EN i18n via `next-intl` routing (currently basic text map). 

