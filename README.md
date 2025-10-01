Topnotch Electronics – Storefront & Dashboard
============================================

Tech stack
----------
- Next.js App Router + TypeScript
- Tailwind v4 (CSS layer)

Scripts
-------
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm start` – run production build

Brand theme
-----------
- Accent orange: `#ff7a00`
- Light: white background, near-black foreground
- Dark: pure black background, light gray foreground

Routes
------
- `/` – storefront with hero and featured grid
- `/dashboard` – admin dashboard with sidebar, KPI cards, and table

Theme toggle
------------
Theme persists in `localStorage` under key `tne-theme`. Initial load script applies `theme-dark` on `<html>` if value is `dark`.
