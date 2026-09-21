# BookNow — Development Roadmap

> **Last updated:** September 20, 2026
> **Current progress:** 65%

This document describes the planned development roadmap for BookNow, organized in incremental phases. Each phase builds on the previous one and can be deployed independently.

---

## Table of Contents

- [Overview](#overview)
- [Phase 1 — Missing Foundations](#phase-1--missing-foundations-critical-priority)
- [Phase 2 — Appointment System (Core)](#phase-2--appointment-system-core)
- [Phase 3 — Reviews & Quality](#phase-3--reviews--quality)
- [Phase 4 — Email Notifications](#phase-4--email-notifications)
- [Phase 5 — Quality & Testing](#phase-5--quality--testing)
- [Phase 6 — Advanced UX & Polish](#phase-6--advanced-ux--polish)
- [Phase 7 — Production & Scalability](#phase-7--production--scalability)
- [Progress Summary](#progress-summary)

---

## Overview

```
Phase 1         Phase 2         Phase 3         Phase 4
Foundations ──▶ Appointments ─▶ Reviews ──────▶ Email Notifs
  (2 wks)       (3 wks)         (1.5 wks)       (1 wk)
    │               │               │               │
    ▼               ▼               ▼               ▼
Phase 5         Phase 6         Phase 7
Testing ──────▶ UX Polish ───▶ Production
  (2 wks)       (1.5 wks)       (2 wks)
```

**Estimated total time:** ~13 weeks (~3 months)

---

## Phase 1 — Missing Foundations (Critical Priority)

> **Estimated duration:** 2 weeks
> **Goal:** Complete missing basic CRUD features and lay the groundwork for the appointment system.

### 1.1 — Full Service CRUD

**Backend:**

- [ ] `PUT /services/{id}` — Update service (name, description, price, duration)
- [ ] `DELETE /services/{id}` — Delete service (soft delete)
- [ ] `PATCH /services/{id}/cover-photo` — Update cover photo
- [ ] Create `UpdateServiceCommand`, `UpdateServiceUseCase`, `DeleteServiceUseCase`
- [ ] Implement persistence adapter with update/delete methods
- [ ] Validate that only the owning provider can modify/delete

**Frontend:**

- [ ] Service editing page in the Manager
- [ ] Delete service button with confirmation dialog
- [ ] Cover photo update form
- [ ] Update `ServicesStore` with update/delete actions

### 1.2 — Availability System

**Backend:**

- [ ] Create `AvailabilityEntity` (JPA) with ManyToOne relation to `ServiceEntity`
- [ ] Create `AvailabilityJpaRepository` with queries by serviceId
- [ ] Create ports: `SaveAvailabilityPort`, `LoadAvailabilitiesByServiceIdPort`, `DeleteAvailabilityPort`
- [ ] Create use cases: `CreateAvailabilityUseCase`, `GetAvailabilitiesUseCase`, `UpdateAvailabilityUseCase`, `DeleteAvailabilityUseCase`
- [ ] Create `AvailabilityRestApi` with CRUD endpoints
- [ ] Validate no overlapping time slots

**Frontend:**

- [ ] Availability management form in the Manager
- [ ] Visual day and time slot selector
- [ ] Integrate availability into the service creation flow (Step 2)
- [ ] Public availability view on the service detail page

### 1.3 — Database Migrations

- [ ] Add Flyway as a dependency
- [ ] Create initial migration (`V1__init.sql`) with the current schema
- [ ] Change `ddl-auto=update` to `ddl-auto=validate`
- [ ] Document the migration process

---

## Phase 2 — Appointment System (Core)

> **Estimated duration:** 3 weeks
> **Goal:** Implement the full appointment booking flow, from time slot selection to confirmation.
> **Dependencies:** Phase 1 (Availability)

### 2.1 — Appointment Backend

**Model & Persistence:**

- [ ] Create `AppointmentEntity` with relations to User, Service, Availability
- [ ] Create `AppointmentJpaRepository` with queries by userId, serviceId, date
- [ ] Implement `AppointmentPersistenceAdapter`
- [ ] Implement `AppointmentJpaMapper` with MapStruct

**Ports & Use Cases:**

- [ ] `CreateAppointmentUseCase` — Create appointment with availability and overlap validation
- [ ] `GetUserAppointmentsUseCase` — List client appointments (paginated)
- [ ] `GetProviderAppointmentsUseCase` — List provider's received appointments (paginated)
- [ ] `UpdateAppointmentStatusUseCase` — Change status (PENDING → CONFIRMED / CANCELLED / COMPLETED)
- [ ] `CancelAppointmentUseCase` — Cancel appointment (with minimum notice time validation)

**Endpoints:**

- [ ] `POST /appointments` — Create appointment
- [ ] `GET /appointments` — List authenticated client's appointments
- [ ] `GET /appointments/provider` — List received appointments (provider)
- [ ] `PATCH /appointments/{id}/status` — Update status
- [ ] `DELETE /appointments/{id}` — Cancel appointment

**Validations:**

- [ ] Verify requested time is within the service's availability
- [ ] Verify no other appointment exists at the same time
- [ ] Verify appointment date is in the future
- [ ] Prevent cancellation with less than X hours notice

### 2.2 — Appointment Frontend (Client)

- [ ] **Booking flow** (replace the placeholder `AppointmentComponent`):
  - [ ] Date picker (calendar)
  - [ ] Time slot selector based on service availability
  - [ ] Optional notes field
  - [ ] Appointment summary before confirmation
  - [ ] Success confirmation screen
- [ ] **My Appointments** (new route `/appointments`):
  - [ ] Appointment list with status filters (Pending, Confirmed, Cancelled, Completed)
  - [ ] Appointment card with service info, provider, date, and time
  - [ ] Cancel appointment button
  - [ ] Pagination

### 2.3 — Appointment Frontend (Provider)

- [ ] **Appointment dashboard in the Manager** (new section):
  - [ ] List of received appointments with status filters
  - [ ] Confirm / reject / complete appointment buttons
  - [ ] Day/week calendar view with appointments
  - [ ] Basic stats (appointments today, this week, this month)

---

## Phase 3 — Reviews & Quality

> **Estimated duration:** 1.5 weeks
> **Goal:** Allow clients to leave reviews after a completed appointment.
> **Dependencies:** Phase 2 (Appointments)

### 3.1 — Review Backend

- [ ] Create `ReviewEntity` with relations to User and Service
- [ ] Create `ReviewJpaRepository`
- [ ] Create `ReviewPersistenceAdapter`
- [ ] `CreateReviewUseCase` — Only allow reviews for COMPLETED appointments
- [ ] `GetServiceReviewsUseCase` — List service reviews (paginated)
- [ ] `POST /services/{id}/reviews` — Create review
- [ ] `GET /services/{id}/reviews` — List reviews (if not already covered by detail)
- [ ] Update `avgRating` calculation when reviews are created
- [ ] Validate a user can only leave one review per service

### 3.2 — Review Frontend

- [ ] Review form (star rating + comment)
- [ ] Show review form only for COMPLETED appointments without a prior review
- [ ] Update `ReviewsComponent` with pagination
- [ ] Show "Verified" badge on reviews from users with a completed appointment

---

## Phase 4 — Email Notifications

> **Estimated duration:** 1 week
> **Goal:** Send email notifications to keep users and providers informed about appointment activity.
> **Dependencies:** Phase 2 (Appointments)

### 4.1 — Appointment Email Notifications

- [ ] Email to provider when a new appointment is received
- [ ] Email to client when their appointment is confirmed/rejected
- [ ] Reminder email X hours before the appointment
- [ ] Cancellation notification email
- [ ] Email templates for each notification type (reuse the existing `EmailService` HTML template system)

### 4.2 — Scheduled Reminders

- [ ] Set up Spring `@Scheduled` task for appointment reminders
- [ ] Query upcoming appointments within the reminder window
- [ ] Mark reminders as sent to avoid duplicates

---

## Phase 5 — Quality & Testing

> **Estimated duration:** 2 weeks
> **Goal:** Establish a solid testing foundation to ensure code quality.

### 5.1 — Backend Unit Tests

- [ ] Tests for all Use Cases (`*Service.java`)
- [ ] Tests for Persistence Adapters
- [ ] Tests for mappers (MapStruct)
- [ ] Tests for JwtProvider and JwtFilter
- [ ] Mock external services (Firebase, Email)
- [ ] Configure minimum coverage (>80%)

### 5.2 — Backend Integration Tests

- [ ] Set up Testcontainers with PostgreSQL
- [ ] Integration tests for each controller/endpoint
- [ ] Security tests (authorized/unauthorized access)
- [ ] DTO validation tests

### 5.3 — Frontend Tests

- [ ] Unit tests for all services
- [ ] Unit tests for stores (`@ngrx/signals`)
- [ ] Component tests for shared components
- [ ] Tests for guards and interceptors
- [ ] Configure minimum coverage (>70%)

### 5.4 — E2E Tests

- [ ] Set up Cypress or Playwright
- [ ] E2E tests for the authentication flow
- [ ] E2E tests for the search flow
- [ ] E2E tests for the appointment booking flow
- [ ] E2E tests for the Manager flow

---

## Phase 6 — Advanced UX & Polish

> **Estimated duration:** 1.5 weeks
> **Goal:** Improve the overall user experience with quality-of-life enhancements.

### 6.1 — UI/UX Improvements

- [ ] Skeleton loaders for all pages with loading states
- [ ] Toast notifications for action feedback
- [ ] Smooth animations and transitions
- [ ] Improved responsive design for mobile devices
- [ ] Error pages (404, 500)

### 6.2 — Additional Features

- [ ] Favorites / Saved services
- [ ] Recent search history
- [ ] Advanced search filters (price, rating, location, category)
- [ ] Service categories
- [ ] Share service on social media

---

## Phase 7 — Production & Scalability

> **Estimated duration:** 2 weeks
> **Goal:** Prepare the application for production with all necessary security and performance measures.

### 7.1 — Infrastructure

- [ ] Set up CI/CD (GitHub Actions)
- [ ] Dockerization (Dockerfile for API and Client)
- [ ] Docker Compose for local development
- [ ] Deploy to cloud (Railway / Render / AWS)
- [ ] Configure domain and SSL

### 7.2 — Security & Performance

- [ ] Rate limiting with Bucket4j or Spring Gateway
- [ ] Caching with Redis (popular services, home)
- [ ] Structured logging with Logback/SLF4J
- [ ] Health checks and actuator endpoints
- [ ] Automated PostgreSQL backups

### 7.3 — SEO

- [ ] Server-Side Rendering (Angular SSR) or pre-rendering
- [ ] Dynamic meta tags for services and providers
- [ ] Generated sitemap.xml

### 7.4 — Admin Panel

- [ ] ADMIN role with metrics dashboard
- [ ] User management (ban, manual verification)
- [ ] Review moderation
- [ ] System metrics (active users, daily appointments)

---

## Progress Summary

### Current State (September 2026)

| Phase | Description                   |   Status    | Progress |
| :---- | :---------------------------- | :---------: | :------: |
| —     | Authentication & Security     |  Complete   |   100%   |
| —     | Home, Search, Profiles        |  Complete   |   100%   |
| —     | Services (Create + Read)      |  Complete   |   100%   |
| —     | Settings (Profile + Security) |  Complete   |   100%   |
| —     | UI Components + Design System |  Complete   |   100%   |
| 1     | Missing Foundations           | Not started |    0%    |
| 2     | Appointment System            | Not started |    0%    |
| 3     | Reviews & Quality             | Not started |    0%    |
| 4     | Email Notifications           | Not started |    0%    |
| 5     | Quality & Testing             | Not started |    0%    |
| 6     | Advanced UX & Polish          | Not started |    0%    |
| 7     | Production & Scalability      | Not started |    0%    |

### Key Milestones

| Milestone      | Target            | Description                                                         |
| :------------- | :---------------- | :------------------------------------------------------------------ |
| Functional MVP | Phases 1 + 2 done | Users can search services, view details, and book appointments      |
| Public Beta    | Phases 1–5 done   | Platform with appointments, reviews, email notifications, and tests |
| Release v1.0   | Phases 1–7 done   | Complete platform ready for production                              |

---

## Notes

- Time estimates assume **one developer** working part-time.
- Each phase is independently deployable (incremental approach).
- Priorities may be adjusted based on user feedback.
- The tech stack is already defined — no framework migrations are planned.

---

_Have suggestions or want to change priorities? Open an issue or contribute to the project._
