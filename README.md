# Commercial Management in Construction — Interactive Study

A cutting-edge, single-page study experience that transforms the *Commercial Management in
Construction* (RICS / AIQS APC) presentation notes into an engaging, interactive learning app.

Built with **React + TypeScript + Vite + Tailwind CSS**, styled in a blend of **Glassmorphism**,
**Neomorphism** and **Liquid-glass** UI.

## ✨ Features

- **Dynamic content sections** — accordions & tabbed interfaces keep dense material digestible.
- **Interactive 3D flashcards** — click to flip between term and definition, filterable by topic.
- **Visual timelines** — the pre-contract and post-contract life-cycles rendered as expandable timelines.
- **Progress tracking** — a circular indicator in the navbar fills as you review each section (persisted to `localStorage`).
- **Knowledge check** — a 10-question quiz with instant feedback and scoring.
- **Micro-interactions** — liquid background blobs, hover lifts, smooth reveals and spring-animated pills.

## 🎨 Design language

| Token     | Hex       |
|-----------|-----------|
| Bronze    | `#9E875D` |
| Charcoal  | `#2D3436` |
| Cream     | `#F5F3EE` |
| Tan       | `#EDE6D3` |

Headings use **Playfair Display**; body copy uses **Open Sans**. The teal `#00968F` is intentionally
never used.

## 🚀 Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

## 📚 Content

All study content lives in [`src/data/content.ts`](src/data/content.ts), structured into typed
sections, timelines, tabs, flashcards and quiz questions — distilled from the original 23-slide
presentation by Roshan de Silva (APC Coaching).

## 🛠 Tech

- React 18 · TypeScript 5 · Vite 5
- Tailwind CSS 3 · Framer Motion · lucide-react

> Deployed as a static site on Vercel (`framework: vite`).
