# 🏔️ Sherpas AI Sales Agent

A powerful, autonomous outbound sales platform built to discover local businesses, enrich their data using AI, and automate hyper-personalized outreach campaigns across Email and WhatsApp. 

Built specifically for B2B service providers, agencies, and SaaS founders to scale their outbound prospecting without sacrificing personalization.

![Sherpas AI Sales Agent](https://raw.githubusercontent.com/Sh1sh1R017/sherpas/main/public/og-image.png)

## ✨ Core Features

*   **📍 Local Discovery Engine:** 
    *   Powered by Google Places API. Search any city or coordinate radius for specific niches (e.g., "Roofers in Austin, TX").
    *   Automatically extracts business name, address, Google ratings, and website URIs.
*   **🧠 AI Enrichment & Scraping:**
    *   The platform autonomously visits the lead's website and scrapes the raw HTML.
    *   Uses **Google Gemini 2.5 Flash** to analyze the business, identify pain points, and discover opportunities.
    *   Intelligently extracts hidden email addresses and phone numbers.
*   **🔥 Smart Prioritization:**
    *   The AI assigns a **Lead Score (0-100)** based on the business's digital readiness.
    *   *Super Hot Leads:* Businesses with no website or zero online presence are automatically flagged as "Super Hot 🔥" (perfect targets for digital services).
*   **✍️ 1-Click AI Drafting:**
    *   Generates a hyper-personalized, 3-4 sentence cold email tailored specifically to the lead's scraped pain points.
    *   Signs off automatically using the authenticated user's real name (via Clerk).
*   **🚀 Multi-Channel Sending:**
    *   **Gmail Integration:** Deep-links directly to the Gmail compose window with the drafted email pre-filled.
    *   **WhatsApp Integration:** Deep-links directly to the native WhatsApp Desktop/Mobile app with the drafted message pre-filled.
    *   **Background API Sending:** Connect your Google Account via OAuth to send emails and automated follow-ups directly from your inbox using the Gmail API.
*   **⏳ Automated Drip Campaigns:**
    *   Background cron jobs automatically schedule and send follow-up emails (Step 2) 3 days after the initial outreach if no reply is detected.

## 🛠️ Technology Stack

*   **Framework:** Next.js 14 (App Router)
*   **Styling:** Tailwind CSS + shadcn/ui
*   **Database:** PostgreSQL (hosted on Supabase)
*   **ORM:** Prisma
*   **Authentication:** Clerk
*   **AI Engine:** Google Gemini SDK (`gemini-2.5-flash`)
*   **APIs:** Google Places API, Google OAuth (Gmail API)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Sh1sh1R017/sherpas.git
cd sherpas/sales-agent
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the `sales-agent` directory and configure the following keys:
```env
# Database (Supabase / Postgres)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Google APIs
GEMINI_API_KEY="..."
GOOGLE_PLACES_API_KEY="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

### 4. Setup the Database
Sync the Prisma schema to your PostgreSQL database:
```bash
npx prisma db push
```

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 🔒 Google OAuth Setup (For Email Sending)
To allow the app to send emails on your behalf, you must configure a Google Cloud Project:
1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Gmail API**.
3. Configure the **OAuth Consent Screen**. Leave it in "Testing" mode and add your personal email to the **Test Users** list to avoid lengthy verification processes.
4. Create **OAuth 2.0 Client IDs** and add them to your `.env` file. Add `http://localhost:3000/api/auth/google/callback` to the Authorized redirect URIs.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! 
Feel free to check the [issues page](https://github.com/Sh1sh1R017/sherpas/issues).

## 📝 License
This project is proprietary software belonging to Sherpas Technology.
