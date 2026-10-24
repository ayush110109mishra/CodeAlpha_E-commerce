# Forma — Minimal Lifestyle & Tech Store

> **CodeAlpha Full Stack Development Internship Project**  
> **Milestone**: Phase 2 — Premium E-Commerce Visual Experience  
> **Status**: Art-Directed Visual Experience Complete

Forma is an editorial, minimalist consumer storefront crafted for modern workstation accessories, acoustic devices, and everyday carry pieces. Inspired by the confident product-led aesthetic of Nothing.tech, the tactile material focus of Grovemade, and the restrained clarity of Apple, Forma combines warm ivory surfaces, ink typography, and deliberate art direction.

---

##  Visual Identity & Design Principles

- **Warm Neutral Foundation**: Warm ivory/off-white background (`#fafaf8`), crisp white surfaces, rich ink-black headings (`#111111`), and subtle border dividers (`#eae8e1`).
- **Editorial Typography**: Pairing of modern sans-serif (`Plus Jakarta Sans`) with elegant serif accents (`Playfair Display`) for headings and philosophical statements.
- **Micro-Interactions**: Gentle image zoom states, tactile button responses, and smooth category transitions adhering to `prefers-reduced-motion`.
- **Responsive Architecture**: Fluid adaptation across desktop, tablet, and mobile screens without horizontal overflow.

---

##  Implemented Routes & Visual Layouts

| Route | Component | Highlights of Phase 2 Experience |
| :--- | :--- | :--- |
| `/` | `HomePage` | Cinematic campaign hero, 4 category discovery tiles, curated studio drops, signature collection feature "Objects for the in-between", and material craftsmanship statement. |
| `/products` | `ProductsPage` | Complete catalogue with live sorting (Curated, Price Low-High, Price High-Low, Alphabetical), category filter pills (`?category=...`), and inventory counter. |
| `/products/:slug` | `ProductDetailPage` | High-fidelity product showcase, interactive quantity counter, technical specifications table, value guarantees, and related studio pairings. |
| `/cart` | `CartPage` | Genuinely empty shopping bag by default with a clean empty state, accompanied by an isolated "Preview Order Summary Layout" toggle for design review. |
| `/*` | `NotFoundPage` | Restrained 404 error page with quick links back to the active catalogue. |

---

##  Technology Stack

- **Build Tool**: [Vite 8](https://vite.dev/) — High-speed modern bundler with Hot Module Replacement (HMR).
- **Frontend Framework**: [React 19](https://react.dev/) — Functional components with hooks.
- **Language**: JavaScript (ES Modules) — Clean ES6+ syntax without TypeScript overhead.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) — Integrated via official `@tailwindcss/vite` plugin.
- **Routing**: [React Router v7](https://reactrouter.com/) (`react-router-dom`) — Declarative client-side routing.
- **Icons**: [Lucide React](https://lucide.dev/) — Consistent, lightweight line icons.
- **Linter**: [Oxlint](https://oxc.rs/) — High-speed linting with React purity checks.

---

##  Project Architecture

```text
E-commerce codeAlpha/
├── index.html                   # HTML entry point with Plus Jakarta Sans & Playfair Display
├── package.json                 # Project dependencies & npm scripts
├── vite.config.js               # Vite config with React & Tailwind v4 plugins
├── .gitignore                   # Excludes node_modules, dist, .env, and sensitive files
├── README.md                    # Project documentation
├── public/                      # Static public assets
└── src/
    ├── app/
    │   ├── App.jsx              # Root component with RouterProvider
    │   └── router.jsx           # Route declarations with MainLayout nesting
    ├── assets/                  # Static SVGs and imagery
    ├── components/
    │   ├── layout/
    │   │   ├── MainLayout.jsx   # Global layout shell with ivory background
    │   │   ├── SiteHeader.jsx   # Slim announcement bar, wordmark & responsive drawer
    │   │   └── SiteFooter.jsx   # Value pillars, sitemap, and dispatch newsletter
    │   ├── products/
    │   │   └── ProductCard.jsx  # Reusable card with image stage & hover interactions
    │   └── ui/                  # Reusable UI component slot
    ├── data/
    │   └── products.js          # Centralized catalogue with metadata & query helpers
    ├── hooks/                   # Custom hooks slot (reserved for future state)
    ├── lib/
    │   └── utils.js             # Formatting (`formatPrice`) & class merging (`cn`)
    ├── pages/
    │   ├── HomePage.jsx         # Art-directed hero, categories, studio drops, story
    │   ├── ProductsPage.jsx     # Catalogue with live sorting & category filter
    │   ├── ProductDetailPage.jsx# Dynamic route with specifications & pairings
    │   ├── CartPage.jsx         # Empty cart by default + isolated preview mode
    │   └── NotFoundPage.jsx     # 404 fallback page
    ├── styles/
    │   └── index.css            # Tailwind CSS v4, warm ivory tokens & reduced motion
    └── main.jsx                 # DOM entry point
```

---

##  Prerequisites & Installation

### Prerequisites

- **Node.js**: `v18.0.0` or later (tested on `v24.14.1`)
- **npm**: `v9.0.0` or later (tested on `v11.11.0`)
- Modern web browser

### Development & Build Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with HMR at `http://localhost:5173/` |
| `npm run build` | Compiles production-ready bundle into `dist/` |
| `npm run preview` | Locally serves the production build |
| `npm run lint` | Runs Oxlint across all source files |

---

##  Current Scope & Limitations

1. **Centralized Mock Data**: Products and category metadata are stored in `src/data/products.js`. No live external database or REST API is connected in this visual phase.
2. **No Backend or Database**: Express/Node.js endpoints and MongoDB are deferred to later phases.
3. **No User Accounts or Auth**: Login, registration, and user profiles are out of scope.
4. **No Payment Processing**: Payment gateways (Stripe/Razorpay) are not connected.
5. **Cart State & Persistence**: Cart starts genuinely empty by default. Add to Bag buttons provide simulated feedback. Full persistent global state management (`useCart`) and transaction flows will be wired in future iterations.
