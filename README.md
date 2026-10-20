# Forma — Premium Lifestyle & Tech Store

> **CodeAlpha Full Stack Development Internship Project**  
> **Milestone**: Phase 1 — Frontend Foundation & Architecture  
> **Status**: Checkpoint Complete & Ready for Evaluation

Forma is an editorial, minimalist e-commerce storefront crafted for modern lifestyle goods, workstation accessories, and everyday carry pieces. Designed with clean typography, generous whitespace, high-fidelity imagery, muted monochrome neutrals, and responsive layouts.

---

## 📋 Project Overview & Phase 1 Scope

This repository represents **Phase 1 (Project Foundation)** of the CodeAlpha Full Stack Development Internship. The objective of this phase is to establish a robust, maintainable, and scalable frontend architecture without introducing backend complexity or state management prematurely.

### Included in Phase 1:
- Clean Vite + React (JavaScript ES Modules) configuration.
- Tailwind CSS v4 integration using official `@tailwindcss/vite` tooling.
- Modular, domain-driven project folder structure.
- Client-side routing with nested layouts (`MainLayout`, `SiteHeader`, `SiteFooter`).
- 5 comprehensive page shells: Home, Catalogue, Product Detail, Cart, and 404 Not Found.
- Centralized mock product dataset with realistic fields, specifications, and query helpers.
- Fully responsive navigation with desktop links and mobile drawer.
- Clean production build and zero linting warnings.

---

## 🛠️ Technology Stack

- **Build Tool**: [Vite 8](https://vite.dev/) — High-speed modern bundler with Hot Module Replacement (HMR).
- **Frontend Library**: [React 19](https://react.dev/) — Component-based UI using functional components and hooks.
- **Language**: JavaScript (ES Modules) — Clean ES6+ syntax without TypeScript overhead for this phase.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) — Next-generation utility-first CSS via `@tailwindcss/vite`.
- **Client Routing**: [React Router v7](https://reactrouter.com/) (`react-router-dom`) — Declarative client-side routing with dynamic params.
- **Iconography**: [Lucide React](https://lucide.dev/) — Minimalist, consistent SVG icons.
- **Code Quality**: [Oxlint](https://oxc.rs/) — High-performance static analysis and React purity linting.

---

## 📂 High-Level Folder Structure

```text
E-commerce codeAlpha/
├── index.html                   # HTML entry point with web fonts & metadata
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js               # Vite configuration with React & Tailwind v4 plugins
├── .gitignore                   # Excludes dependencies, builds, logs, and env files
├── README.md                    # Project documentation
├── public/                      # Static public assets & favicons
└── src/
    ├── app/
    │   ├── App.jsx              # Root component with RouterProvider
    │   └── router.jsx           # Central client-side routes & layout hierarchy
    ├── assets/                  # Static SVGs and imagery
    ├── components/
    │   ├── layout/
    │   │   ├── MainLayout.jsx   # Global layout shell (Header + Outlet + Footer)
    │   │   ├── SiteHeader.jsx   # Header with logo, navigation & mobile menu
    │   │   └── SiteFooter.jsx   # Footer with value pillars and sitemap
    │   ├── products/
    │   │   └── ProductCard.jsx  # Reusable card component for catalogue grids
    │   └── ui/                  # Slot for future UI primitives
    ├── data/
    │   └── products.js          # Centralized catalogue dataset & query helpers
    ├── hooks/                   # Custom React hooks (reserved for Phase 2)
    ├── lib/
    │   └── utils.js             # Reusable utility functions (`cn`, `formatPrice`)
    ├── pages/
    │   ├── HomePage.jsx         # Hero banner, category navigation, featured products
    │   ├── ProductsPage.jsx     # Catalogue with live category filtering
    │   ├── ProductDetailPage.jsx# Dynamic route for single product specs & details
    │   ├── CartPage.jsx         # Order summary & bag foundation shell
    │   └── NotFoundPage.jsx     # 404 fallback page
    ├── styles/
    │   └── index.css            # Tailwind CSS v4 import and base typography rules
    └── main.jsx                 # React root DOM rendering entry point
```

---

## 🧭 Implemented Routes

| Route | Component | Purpose & Description |
| :--- | :--- | :--- |
| `/` | `HomePage` | Editorial hero showcase, category tiles, curated studio picks, and design ethos. |
| `/products` | `ProductsPage` | Full product catalogue with live category filtering via URL search params (`?category=...`). |
| `/products/:slug` | `ProductDetailPage` | Dynamic route loading individual product specifications, high-res preview, and action shell. |
| `/cart` | `CartPage` | Shopping bag foundation shell with preview items, calculations, and empty state simulator. |
| `/*` | `NotFoundPage` | Restrained 404 error page with direct navigation back to active store sections. |

---

## 🚀 Prerequisites & Installation

### Prerequisites

- **Node.js**: `v18.0.0` or later (tested on `v24.14.1`)
- **npm**: `v9.0.0` or later (tested on `v11.11.0`)
- A modern web browser (Chrome, Edge, Firefox, Safari)

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd "E-commerce codeAlpha"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## 💻 Available Scripts & Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR) at `http://localhost:5173/` |
| `npm run build` | Compiles and bundles production-ready assets into the `dist/` directory |
| `npm run preview` | Locally serves the production build from `dist/` for verification |
| `npm run lint` | Runs Oxlint across all source files to verify code quality and React purity rules |

---

## ⚠️ Current Limitations & Scope Boundaries

As part of the disciplined milestone roadmap for Phase 1, the following features are intentionally deferred to subsequent phases:

1. **Mock Product Data**: All product data is centralized locally in `src/data/products.js`. No live external REST/GraphQL API or headless CMS is connected yet.
2. **No Backend or Database**: There is no Express.js/Node.js server, MongoDB, or relational database in this phase.
3. **No Authentication or User Accounts**: User registration, login, JWT/session management, and profiles are out of scope for Phase 1.
4. **No Payment Integration**: Checkout payment gateways (Stripe, Razorpay, etc.) are not integrated.
5. **Cart & Checkout Shell**: The `/cart` page and "Add to Bag" buttons are interactive foundation shells demonstrating UI layout, responsive structure, and order summary math. Full global state management (`useCart` / Context) and checkout transactions will be implemented in Phase 2.

---

## 🗺️ Roadmap Ahead

- **Phase 2 (Frontend State & Interactivity)**: Global cart context, persistent local storage, quantity controls, search filtering, and toast notifications.
- **Phase 3 (Backend Integration)**: Express REST API, MongoDB data models, order processing, and authenticated checkout.
