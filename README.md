# Website Revenue Leak Detector

Premium React + TypeScript lead magnet for Key City Digital.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run local dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview production build:
   ```bash
   npm run preview
   ```

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, import the repo.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

## CRM / Webhook integration point

Use `submitLeadToCRM` in `src/logic/scoring.ts` to post lead payloads and audit results to HubSpot, HighLevel, Zapier, or a custom webhook.

## Demo / sample mode

Use the **Demo Mode** button in the multi-step interface to instantly load sample business data and responses.
