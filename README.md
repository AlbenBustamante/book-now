# BookNow

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.3-green.svg)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Angular-19-red.svg)](https://angular.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue.svg)](https://www.postgresql.org/)

**BookNow** is a web-based appointment scheduling platform that connects professional **service providers** with **clients** who search for and book appointments. Built with hexagonal architecture on the backend and a feature-based architecture on the frontend.

> Made in Colombia & Venezuela by [Alben Bustamante](https://albenbustamante.dev)

---

## Table of Contents

- [Project Status](#project-status)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Implemented Features](#implemented-features)
- [Pending Features](#pending-features)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [License](#license)

---

## Project Status

> **Last updated:** September 20, 2026

### Overall Progress

| Area                  | Completed | Pending | Progress |
| :-------------------- | :-------: | :-----: | :------: |
| **Backend (API)**     |    14     |   10    | **58%**  |
| **Frontend (Client)** |    16     |    6    | **73%**  |
| **Overall Project**   |    30     |   16    | **65%**  |

```
Overall Project Progress
████████████████░░░░░░░░░░  65%
```

### Progress by Module

| Module                        | Backend | Frontend |  Status  |
| :---------------------------- | :-----: | :------: | :------: |
| Authentication                |  100%   |   100%   | Complete |
| User Management               |  100%   |   100%   | Complete |
| Home / Landing                |  100%   |   100%   | Complete |
| Search                        |  100%   |   100%   | Complete |
| Provider Profile              |  100%   |   100%   | Complete |
| Services (CRUD)               |   60%   |   70%    | Partial  |
| Service Detail                |  100%   |   100%   | Complete |
| Settings (Profile + Security) |  100%   |   100%   | Complete |
| Availability (Schedules)      |   10%   |    0%    | Pending  |
| Appointments                  |   10%   |    5%    | Pending  |
| Reviews                       |   40%   |   80%    | Partial  |
| Email Notifications           |   30%   |    —     | Partial  |
| Testing                       |   5%    |   15%    | Pending  |
| API Documentation             |  100%   |    —     | Complete |

---

## Architecture

### Backend — Hexagonal Architecture (Ports & Adapters)

```
┌──────────────────────────────────────────────────────────┐
│                    Infrastructure                        │
│  ┌────────────────┐              ┌────────────────────┐  │
│  │  REST Adapters  │              │   Persistence      │  │
│  │  (Controllers)  │──── In ────▶│   Adapters         │  │
│  │  @RestAdapter   │              │   @PersistenceAdapter│ │
│  └───────┬────────┘              └─────────┬──────────┘  │
│          │                                 │             │
│     Input Ports                      Output Ports        │
│    (Use Cases)                    (Load/Save Ports)      │
│          │                                 │             │
│  ┌───────▼─────────────────────────────────▼──────────┐  │
│  │              Application Services                   │  │
│  │                  @UseCase                           │  │
│  └──────────────────────┬─────────────────────────────┘  │
│                         │                                │
│  ┌──────────────────────▼─────────────────────────────┐  │
│  │                Domain Models                        │  │
│  │               (Java Records)                        │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

### Frontend — Feature-Based Architecture

```
AppComponent (Root Shell)
├── auth/          → Authentication flow (own layout)
├── manager/       → Provider portal (own layout)
├── sign-out       → Sign out
└── MainLayout     → Main shell for clients
    ├── Navbar (search, user dropdown)
    ├── <router-outlet /> (dynamic content)
    │   ├── home/          → Home page
    │   ├── search/        → Search results
    │   ├── service/:id    → Service detail + booking
    │   ├── provider/:id   → Provider profile
    │   └── settings/      → Settings (profile + security)
    └── Footer
```

---

## Tech Stack

### Backend

| Technology            | Version | Purpose                        |
| :-------------------- | :------ | :----------------------------- |
| **Java**              | 17      | Language                       |
| **Spring Boot**       | 3.5.3   | Main framework                 |
| **Spring Security**   | —       | Authentication & authorization |
| **Spring Data JPA**   | —       | Persistence layer              |
| **Spring Mail**       | —       | HTML email sending             |
| **Spring Validation** | —       | DTO & Command validation       |
| **PostgreSQL**        | —       | Relational database            |
| **java-jwt (Auth0)**  | 4.5.0   | JWT generation & verification  |
| **Firebase Admin**    | 9.4.2   | File storage (Storage)         |
| **Lombok**            | —       | Boilerplate reduction          |
| **MapStruct**         | 1.6.3   | Typed mapping between layers   |
| **springdoc-openapi** | 2.8.9   | Swagger UI documentation       |
| **Gradle**            | —       | Build tool                     |

### Frontend

| Technology             | Version | Purpose                           |
| :--------------------- | :------ | :-------------------------------- |
| **Angular**            | ^19.2.0 | SPA framework                     |
| **TypeScript**         | ~5.7.2  | Language (strict mode)            |
| **Tailwind CSS**       | ^4.1.11 | Utility-first CSS framework       |
| **@ngrx/signals**      | ^19.2.1 | State management with SignalStore |
| **RxJS**               | ~7.8.0  | Reactive programming              |
| **jwt-decode**         | ^4.0.0  | Client-side JWT decoding          |
| **ngx-cookie-service** | ^19.1.2 | Cookie management (JWT storage)   |
| **@ngx-env/builder**   | ^20.0.0 | Environment variable injection    |
| **Karma + Jasmine**    | —       | Testing                           |

---

## Implemented Features

### Authentication & Security

- [x] User registration (Client / Provider) with email verification
- [x] Login with email and password
- [x] JWT generation and validation (HMAC384, 7-day expiration)
- [x] Protected route guards (auth + role-based)
- [x] HTTP interceptor for automatic JWT injection
- [x] Logout with cookie cleanup
- [x] Password hashing with BCrypt
- [x] JWT filter in the Security Filter Chain
- [x] Stateless session management
- [x] Global soft delete with `@SQLRestriction`

### User Management

- [x] Get authenticated user profile (`GET /users/me`)
- [x] Update profile (name, phone, occupation, biography)
- [x] Change password (`PATCH /users/me/password`)
- [x] View public provider profile (`GET /users/provider/{id}`)

### Home / Landing

- [x] Home page with hero section, top services, and top providers
- [x] Featured services carousel
- [x] Featured providers grid
- [x] `GET /home` endpoint with top 10 services and providers

### Search

- [x] Service search by name with pagination
- [x] Result cards with image, price, rating, and address
- [x] "Load more" button for progressive pagination
- [x] Search input in the navbar

### Services

- [x] Create service with cover photo, address, and multi-step form
- [x] List authenticated provider's services (paginated)
- [x] List a specific provider's services (public, paginated)
- [x] View service detail with reviews and average rating
- [x] Photo upload to Firebase Storage
- [x] Address form with cascading selects (country → state → city)

### Settings

- [x] Profile section with inline editable fields
- [x] Security section with password change
- [x] Tab navigation (Profile / Security)

### Email

- [x] HTML email sending service with styled template
- [x] Account verification email with token

### Documentation

- [x] Auto-generated Swagger UI with springdoc-openapi
- [x] OpenAPI spec available at `/v3/api-docs`

### UI / UX

- [x] 15 reusable shared components (Button, Card, Input, Reviews, ServiceCard, Carousel, etc.)
- [x] Documented design system with Tailwind CSS tokens
- [x] Dropdown with CDK Overlay
- [x] Responsive navbar with role-based user menu
- [x] Audit system (createdAt, updatedAt, soft delete)

### Architecture & Patterns

- [x] Hexagonal architecture on the backend (Ports & Adapters)
- [x] Feature-based architecture on the frontend
- [x] 100% standalone components (no NgModules)
- [x] Lazy loading on all routes
- [x] Store-driven state with `@ngrx/signals`
- [x] Smart/Dumb component pattern
- [x] MapStruct for inter-layer mapping
- [x] Custom annotations (`@UseCase`, `@RestAdapter`, `@PersistenceAdapter`)

---

## Pending Features

### High Priority

- [ ] **Appointment system** — Only the domain model exists; ports, services, controllers, persistence, and UI are missing
- [ ] **Availability system** — Only the domain model exists; full implementation needed
- [ ] **Review creation** — Reviews can be read but there's no endpoint to create them
- [ ] **Service editing and deletion** — Only creation is supported
- [ ] **Backend unit tests** — Only `contextLoads()` exists
- [ ] **Frontend tests** — Minimal coverage

### Medium Priority

- [ ] **Provider appointment management** — View, confirm, cancel received appointments
- [ ] **Client appointment view** — History and pending appointments
- [ ] **Email notifications** — Booking confirmation, reminders, cancellation notices
- [ ] **Database migrations** — Use Flyway/Liquibase instead of `ddl-auto=update`
- [ ] **Rate limiting** — No abuse protection
- [ ] **Caching** — Not implemented
- [ ] **Integration tests** — Not implemented
- [ ] **E2E tests** — Not implemented

### Low Priority

- [ ] **Photo management** — Upload works for new services, but no update for existing ones
- [ ] **Admin panel** — No admin functionality
- [ ] **Structured logging** — Basic only

---

## Project Structure

```
book-now/
├── api/                          # Backend — Spring Boot (Hexagonal Architecture)
│   └── src/main/java/dev/alben/booknowapi/
│       ├── core/                 # Cross-cutting components
│       │   ├── auditable/        # Audit system
│       │   ├── common/           # Custom annotations
│       │   ├── config/           # Configuration (CORS, Firebase, JPA, Security)
│       │   ├── email/            # Email service
│       │   ├── exception/        # Exception hierarchy
│       │   ├── security/         # JWT, filters, UserDetails
│       │   └── storage/          # Firebase Storage
│       └── module/               # Business modules
│           ├── address/          # Addresses (sub-entity of Service)
│           ├── appointment/      # Appointments (domain only)
│           ├── auth/             # Authentication
│           ├── availability/     # Availability (domain only)
│           ├── home/             # Home (top services & providers)
│           ├── service/          # Professional services
│           └── user/             # Users
│
├── client/                       # Frontend — Angular 19
│   └── src/app/
│       ├── components/           # 15 reusable components
│       ├── core/                 # Services, guards, interceptors, models
│       ├── directives/           # Shared directives
│       ├── features/             # Feature modules
│       │   ├── auth/             # Login, registration, verification
│       │   ├── home/             # Home page
│       │   ├── manager/          # Provider dashboard
│       │   ├── provider/         # Public provider profile
│       │   ├── search/           # Service search
│       │   ├── service/          # Service detail + appointments
│       │   ├── settings/         # Profile and security
│       │   └── sign-out/         # Sign out
│       └── layouts/              # App layouts
│
├── LICENSE                       # Apache License 2.0
├── README.md                     # This file
└── ROADMAP.md                    # Development roadmap
```

---

## Installation & Setup

### Prerequisites

- **Java 17+**
- **Node.js** ^18.19 / ^20.9 / ^22.0
- **PostgreSQL**
- **Firebase** (account with Storage enabled)
- **Gmail** (account with App Password for email sending)

### Backend (API)

```bash
cd api

# Set environment variables
export CONTEXT_PATH=/api/v1
export DB_URL=jdbc:postgresql://localhost:5432
export DATABASE=booknow
export DB_USERNAME=postgres
export DB_PASSWORD=your_password
export SHOW_SQL=true
export JWT_SECRET_KEY=your_secret_key
export MAIL_USERNAME=your_email@gmail.com
export MAIL_PASSWORD=your_app_password
export VERIFICATION_EXPIRATION_TIME_IN_MINUTES=30
export FIREBASE_BUCKET_NAME=your_bucket.appspot.com
export FIREBASE_CONFIG_PATH=serviceAccountKey.json

# Run
./gradlew bootRun
```

API will be available at `http://localhost:8080/api/v1`
Swagger UI at `http://localhost:8080/api/v1/swagger-ui/index.html`

### Frontend (Client)

```bash
cd client

# Install dependencies
npm install

# Set environment variables (.env)
NG_APP_API_URL=http://localhost:8080/api/v1
NG_APP_COUNTRY_API_KEY=your_api_key

# Run
npm start
```

Application will be available at `http://localhost:4200`

---

## API Endpoints

### Auth (`/auth`)

| Method | Route                       | Description   | Access |
| :----- | :-------------------------- | :------------ | :----- |
| `POST` | `/auth/register`            | Register user | Public |
| `GET`  | `/auth/verify-email?token=` | Verify email  | Public |
| `POST` | `/auth/log-in`              | Log in        | Public |

### Home (`/home`)

| Method | Route   | Description              | Access |
| :----- | :------ | :----------------------- | :----- |
| `GET`  | `/home` | Top services & providers | Public |

### Services (`/services`)

| Method | Route                     | Description                | Access        |
| :----- | :------------------------ | :------------------------- | :------------ |
| `POST` | `/services`               | Create service (multipart) | Provider      |
| `GET`  | `/services`               | List own services          | Authenticated |
| `GET`  | `/services/provider/{id}` | Provider's services        | Public        |
| `GET`  | `/services/details/{id}`  | Service detail             | Public        |

### Users (`/users`)

| Method  | Route                  | Description      | Access        |
| :------ | :--------------------- | :--------------- | :------------ |
| `GET`   | `/users/me`            | User profile     | Authenticated |
| `PUT`   | `/users/me`            | Update profile   | Authenticated |
| `PATCH` | `/users/me/password`   | Change password  | Authenticated |
| `GET`   | `/users/provider/{id}` | Provider profile | Authenticated |

### Documentation

| Route                    | Description  |
| :----------------------- | :----------- |
| `/swagger-ui/index.html` | Swagger UI   |
| `/v3/api-docs`           | OpenAPI spec |

---

## License

This project is licensed under the [Apache License 2.0](LICENSE).

Copyright © 2025 - 2026 [Alben Bustamante](https://albenbustamante.dev)
