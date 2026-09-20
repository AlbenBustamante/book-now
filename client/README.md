# BookNow — Client

**BookNow** is a service booking web platform that connects **providers** (professionals offering services) with **clients** (users searching for and booking appointments). This repository contains the application's **frontend**, built with Angular 19.

## Overview

The application allows users to:

- **Clients**: Search for services by keywords, view details and reviews, and schedule appointments with providers.
- **Providers**: Manage their professional profile, administer the services they offer, and view received appointments.
- **Both roles**: Register, log in, edit their profile, and manage security settings.

## Tech Stack

| Technology             | Version           | Purpose                                              |
| :--------------------- | :---------------- | :--------------------------------------------------- |
| **Angular**            | `^19.2.0`         | Main SPA framework                                   |
| **TypeScript**         | `~5.7.2`          | Programming language (full strict mode)              |
| **Tailwind CSS**       | `^4.1.11`         | Utility-first CSS framework (CSS-first config)       |
| **@ngrx/signals**      | `^19.2.1`         | Reactive state management with SignalStore           |
| **RxJS**               | `~7.8.0`          | Reactive programming for HTTP and streams            |
| **jwt-decode**         | `^4.0.0`          | Client-side JWT token decoding                       |
| **ngx-cookie-service** | `^19.1.2`         | Cookie management (JWT storage)                      |
| **@ngx-env/builder**   | `^20.0.0`         | Environment variable injection via `import.meta.env` |
| **Karma + Jasmine**    | `~6.4.0 / ~5.6.0` | Testing framework                                    |
| **Zone.js**            | `~0.15.0`         | Change detection (with event coalescing enabled)     |

## Architecture

### High-Level Overview

```
AppComponent (Root Shell)
├── auth/          → Authentication flow (own layout)
├── manager/       → Provider portal (own layout)
├── sign-out       → Sign out
└── MainLayout     → Main shell for clients
    ├── Navbar (search, user dropdown)
    ├── <router-outlet /> (dynamic content)
    │   ├── home/          → Home page
    │   ├── appointments/  → User appointments
    │   ├── search/        → Search results
    │   ├── service/:id    → Service detail + booking
    │   ├── provider/:id   → Provider profile
    │   └── settings/      → Settings (profile + security)
    └── Footer
```

### Key Patterns

- **100% Standalone Components** — No `NgModule` used anywhere in the project.
- **Lazy Loading** — All routes lazily load components and submodules (`loadComponent` / `loadChildren`).
- **Feature-Based Architecture** — Each functionality is encapsulated in `src/app/features/<feature>/`.
- **Store-Driven Architecture** — State managed with `@ngrx/signals` (`signalStore`, `patchState`, `withComputed`, `withMethods`).
- **Smart/Dumb Component Pattern** — Container components (smart) handle logic and state; presentational components (dumb) only receive inputs.
- **Functional Interceptors** — Modern function-based JWT interceptor using `HttpInterceptorFn`.
- **Signal-Based Reactivity** — Extensive use of `signal()`, `computed()`, `effect()`, `input()`, `output()`, `model()`.

## Project Structure

```
src/
├── app/
│   ├── components/              # Reusable UI components
│   │   ├── button/              # Polymorphic button (<a> or <button>)
│   │   ├── card/                # Container with border and shadow
│   │   ├── comment/             # Individual review with stars
│   │   ├── container/           # Centered layout wrapper
│   │   ├── divisor/             # Visual separator <hr>
│   │   ├── footer/              # Global footer
│   │   ├── input/               # Form input with FormControl
│   │   ├── reviews/             # Reviews section with average
│   │   ├── router-navbar/       # Tab-style navigation bar
│   │   ├── section-container/   # Section container with title
│   │   ├── service-card/        # Service card
│   │   ├── services-carousel/   # Horizontal services carousel
│   │   ├── subtitle/            # Subtitle <h3>
│   │   ├── text-area/           # Textarea with FormControl
│   │   └── title/               # Title <h2>
│   │
│   ├── core/                    # Global services, models, interceptors
│   │   ├── contexts/            # HttpContextTokens (skipJwt)
│   │   ├── enums/               # Role (CUSTOMER | PROVIDER)
│   │   ├── guards/              # Route guards (pending implementation)
│   │   ├── interceptors/        # jwtInterceptor (functional)
│   │   ├── models/              # Domain interfaces
│   │   ├── services/            # AuthService, JwtService, CountryService
│   │   └── types/               # Status type for stores
│   │
│   ├── directives/              # Shared directives
│   │   └── click-outside/       # Detects clicks outside the element
│   │
│   ├── features/                # Feature modules
│   │   ├── auth/                # Login, registration, successful registration
│   │   ├── home/                # Home page
│   │   ├── provider/            # Provider public profile
│   │   ├── search/              # Service search
│   │   ├── service/             # Service detail + appointments
│   │   ├── settings/            # User profile and security
│   │   └── sign-out/            # Sign out
│   │
│   └── layouts/                 # Application layouts
│       └── main-layout/         # Main layout with navbar and footer
│
├── environments/                # Environment configuration
│   ├── environment.ts           # Production (variables from .env)
│   └── environment.development.ts # Development (localhost:8080)
│
├── styles.css                   # Global styles + Tailwind + Design tokens
├── main.ts                      # Application bootstrap
└── env.d.ts                     # Type declarations for import.meta.env
```

## Path Aliases

| Alias             | Path                   |
| :---------------- | :--------------------- |
| `@components/*`   | `src/app/components/*` |
| `@core/*`         | `src/app/core/*`       |
| `@directives/*`   | `src/app/directives/*` |
| `@environments/*` | `src/environments/*`   |
| `@features/*`     | `src/app/features/*`   |
| `@layouts/*`      | `src/app/layouts/*`    |

## Setup & Installation

### Prerequisites

- **Node.js** `^18.19.0` / `^20.9.0` / `^22.0.0`
- **npm** (included with Node.js)
- Backend API running at `http://localhost:8080/api/v1` (development)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
NG_APP_API_URL=http://localhost:8080/api/v1
NG_APP_COUNTRY_API_KEY=<your-countrystatecity.in-api-key>
```

> Variables are injected at build time by `@ngx-env/builder` and accessed via `import.meta.env['NG_APP_*']`.

### Available Scripts

| Command         | Description                                |
| :-------------- | :----------------------------------------- |
| `npm start`     | Starts the development server (`ng serve`) |
| `npm run build` | Builds for production (`ng build`)         |
| `npm run watch` | Builds in watch mode (development)         |
| `npm test`      | Runs tests with Karma                      |

### Backend API

The application consumes a REST API (likely Spring Boot) at `http://localhost:8080/api/v1`. The pagination model follows the standard Spring Data structure (`PageModel<T>`).

#### External Services

- **Country State City API** (`api.countrystatecity.in`): Provides country, state, and city data for address forms.

## Authentication

1. The user logs in and the backend returns a JWT.
2. The token is stored in a secure cookie with a 7-day expiration.
3. The `jwtInterceptor` automatically attaches the `Authorization: Bearer <token>` header to all HTTP requests (except those marked with `skipJwtFn()`).
4. If the server responds with `401 Unauthorized`, automatic logout is triggered (cookie cleanup + redirect to `/auth`).
5. The user's role (`CUSTOMER` / `PROVIDER`) is extracted from the JWT payload to control navigation and conditional views.

## Domain Models

| Model                                       | Description                                                        |
| :------------------------------------------ | :----------------------------------------------------------------- |
| `UserModel`                                 | User with name, email, role, photo, occupation, biography          |
| `ServiceModel`                              | Service with name, description, price, duration, address, provider |
| `ServiceDetailModel`                        | Service detail with average rating and reviews                     |
| `ReviewModel`                               | Service review (user, rating, comment)                             |
| `AddressModel`                              | Address (country, state, city, street, zip code)                   |
| `PageModel<T>`                              | Generic pagination model (compatible with Spring Data)             |
| `Jwt`                                       | Decoded token payload (id, role, sub, iat, exp)                    |
| `CountryModel` / `StateModel` / `CityModel` | Geographic data from external API                                  |

## Production Build

```bash
npm run build
```

Output is generated in `dist/client/`. Configured budgets:

- **Initial bundle**: Warning at 500kB, Error at 1MB
- **Per-component styles**: Warning at 4kB, Error at 8kB
