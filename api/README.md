# 📅 BookNow API

REST API for a service booking platform, where **providers** publish their professional services and **clients** can explore them, view details, and (coming soon) schedule appointments.

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Modules](#-modules)
- [Technologies and Dependencies](#-technologies-and-dependencies)
- [Reusable Services (Core)](#-reusable-services-core)
- [API Endpoints](#-api-endpoints)
- [Security](#-security)
- [Configuration](#-configuration)
- [Running](#-running)

---

## 🎯 Overview

**BookNow** is a platform that connects service providers with clients. Providers can register, verify their email, create services with a cover photo and address, while clients can explore the service catalog and view provider profiles.

### Key Features

- **User registration** (clients and providers) with email verification
- **Authentication** based on JWT (JSON Web Tokens)
- **Service management** — CRUD for providers with photo uploads to Firebase Storage
- **Public home** — Displays featured services and providers (top 10)
- **Service detail** — Detailed view with reviews and average rating
- **Provider profile** — Public provider information

---

## 🏛 Architecture

The project implements **Hexagonal Architecture (Ports & Adapters)**, inspired by the principles from "Get Your Hands Dirty on Clean Architecture" by Tom Hombergs.

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

### Layers

| Layer                    | Responsibility                                   | Custom Annotation     |
| ------------------------ | ------------------------------------------------ | --------------------- |
| **Domain**               | Pure business models (records) with domain logic | —                     |
| **Application**          | Use cases, input/output ports, commands          | `@UseCase`            |
| **Infrastructure (in)**  | REST adapters, DTOs, DTO mappers                 | `@RestAdapter`        |
| **Infrastructure (out)** | Persistence adapters, JPA entities, JPA mappers  | `@PersistenceAdapter` |

---

## 📁 Project Structure

```
src/main/java/dev/alben/booknowapi/
├── BookNowApiApplication.java
│
├── core/                              # Shared components (cross-cutting)
│   ├── auditable/                     # Audit system (createdAt, updatedBy, etc.)
│   │   ├── Auditable.java            # Domain record
│   │   ├── AuditableDto.java         # Abstract base DTO
│   │   ├── AuditableDtoMapper.java   # Abstract Domain → DTO mapper
│   │   ├── AuditableEntity.java      # @MappedSuperclass with JPA Auditing
│   │   └── AuditableJpaMapper.java   # Abstract Domain ↔ Entity mapper
│   ├── common/                        # Custom annotations
│   │   ├── PersistenceAdapter.java   # @Component alias for persistence
│   │   ├── RestAdapter.java          # @Component alias for REST
│   │   └── UseCase.java             # @Component alias for use cases
│   ├── config/                        # Spring configurations
│   │   ├── CorsConfig.java
│   │   ├── FirebaseConfig.java
│   │   ├── JpaConfig.java
│   │   └── SecurityConfig.java
│   ├── email/                         # Email service
│   │   ├── EmailService.java
│   │   ├── EmailSenderException.java
│   │   └── usecase/
│   │       └── SendHtmlEmailUseCase.java
│   ├── exception/                     # Global exception hierarchy
│   │   ├── AppException.java         # Abstract base exception
│   │   ├── AppExceptionHandler.java  # @RestControllerAdvice
│   │   ├── AppExceptionHandlerFilter.java
│   │   ├── ErrorResponse.java        # Error response record
│   │   ├── AlreadyExistsException.java  # → 409 CONFLICT
│   │   ├── BadRequestException.java     # → 400 BAD REQUEST
│   │   ├── ForbiddenException.java      # → 403 FORBIDDEN
│   │   ├── NotFoundException.java       # → 404 NOT FOUND
│   │   └── UnauthorizedException.java   # → 401 UNAUTHORIZED
│   ├── security/                      # JWT authentication and authorization
│   │   ├── CustomUserDetailsService.java
│   │   ├── JwtFilter.java
│   │   ├── JwtProvider.java
│   │   ├── SecurityConstants.java
│   │   └── UserPrincipal.java
│   └── storage/                       # Storage service (Firebase)
│       ├── StorageService.java
│       └── usecase/
│           ├── DownloadFileUseCase.java
│           └── UploadFileUseCase.java
│
└── module/                            # Business modules
    ├── address/                       # Module: Addresses
    │   ├── application/port/in/command/
    │   │   └── CreateAddressCommand.java
    │   ├── domain/
    │   │   └── Address.java
    │   ├── infrastructure/in/
    │   │   ├── AddressDto.java
    │   │   └── AddressDtoMapper.java
    │   ├── infrastructure/out/persistence/
    │   │   ├── AddressEntity.java
    │   │   └── AddressJpaMapper.java
    │   └── util/
    │       └── AddressConstants.java
    │
    ├── auth/                          # Module: Authentication
    │   ├── application/
    │   │   └── LogInService.java
    │   ├── application/port/in/
    │   │   ├── LogInUseCase.java
    │   │   └── command/LogInCommand.java
    │   ├── application/port/out/response/
    │   │   └── LogInResponse.java
    │   ├── exception/
    │   │   └── BadCredentialsException.java
    │   └── infrastructure/in/
    │       ├── AuthRestApi.java
    │       └── rest/AuthRestAdapter.java
    │
    ├── home/                          # Module: Home (main screen)
    │   ├── application/
    │   │   └── GetHomeService.java
    │   ├── application/port/in/
    │   │   └── GetHomeUseCase.java
    │   ├── application/port/out/
    │   │   ├── LoadTopProvidersPort.java
    │   │   └── LoadTopServicesPort.java
    │   ├── domain/
    │   │   └── Home.java
    │   └── infrastructure/in/
    │       ├── HomeDto.java
    │       ├── HomeDtoMapper.java
    │       ├── HomeRestAdapter.java
    │       └── HomeRestApi.java
    │
    ├── service/                       # Module: Professional Services
    │   ├── application/
    │   │   ├── CreateServiceService.java
    │   │   ├── GetProviderServicesService.java
    │   │   └── GetServiceByIdService.java
    │   ├── application/port/in/
    │   │   ├── CreateServiceUseCase.java
    │   │   ├── GetProviderServicesUseCase.java
    │   │   ├── GetServiceByIdUseCase.java
    │   │   └── command/CreateServiceCommand.java
    │   ├── application/port/out/
    │   │   ├── LoadServiceByIdPort.java
    │   │   ├── LoadServicesByProviderIdPort.java
    │   │   └── SaveServicePort.java
    │   ├── domain/
    │   │   ├── Service.java
    │   │   └── ServiceDetail.java
    │   ├── exception/
    │   │   └── ServiceNotFoundException.java
    │   ├── infrastructure/in/
    │   │   ├── ServiceDto.java
    │   │   ├── ServiceDtoMapper.java
    │   │   ├── ServiceRestAdapter.java
    │   │   ├── ServiceRestApi.java
    │   │   └── detail/
    │   │       ├── ServiceDetailDto.java
    │   │       └── ServiceDetailDtoMapper.java
    │   ├── infrastructure/out/
    │   │   ├── ServicePersistenceAdapter.java
    │   │   └── persistence/
    │   │       ├── ServiceEntity.java
    │   │       ├── ServiceJpaMapper.java
    │   │       └── ServiceJpaRepository.java
    │   └── util/
    │       └── ServiceConstants.java
    │
    └── user/                          # Module: Users
        ├── application/service/
        │   ├── CreateUserService.java
        │   ├── GetProviderByIdService.java
        │   └── VerifyEmailService.java
        ├── application/port/in/
        │   ├── CreateUserUseCase.java
        │   ├── GetProviderByIdUseCase.java
        │   ├── VerifyEmailUseCase.java
        │   └── command/CreateUserCommand.java
        ├── application/port/out/
        │   ├── CheckDniPort.java
        │   ├── CheckEmailPort.java
        │   ├── LoadTokenPort.java
        │   ├── LoadUserByEmailPort.java
        │   ├── LoadUserByIdPort.java
        │   ├── SaveEmailVerificationTokenPort.java
        │   └── SaveUserPort.java
        ├── domain/
        │   ├── EmailVerificationToken.java
        │   └── User.java
        ├── exception/
        │   ├── AccountAlreadyVerifiedException.java
        │   ├── EmailAlreadyVerifiedException.java
        │   ├── EmailVerificationTokenExpiredException.java
        │   ├── EmailVerificationTokenNotFoundException.java
        │   ├── PasswordsDoNotMatchException.java
        │   ├── UserAlreadyExistsByDniException.java
        │   ├── UserAlreadyExistsByEmailException.java
        │   ├── UserHasNotPrivilegesToCreateServiceException.java
        │   └── UserNotFoundByIdException.java
        ├── infrastructure/in/
        │   ├── UserRestAdapter.java
        │   ├── UserRestApi.java
        │   └── rest/
        │       ├── dto/
        │       │   ├── ProviderDto.java
        │       │   └── UserDto.java
        │       └── mapper/
        │           └── UserDtoMapper.java
        ├── infrastructure/out/
        │   ├── EmailVerificationTokenPersistenceAdapter.java
        │   ├── UserPersistenceAdapter.java
        │   └── persistence/
        │       ├── entity/
        │       │   ├── EmailVerificationTokenEntity.java
        │       │   └── UserEntity.java
        │       ├── mapper/
        │       │   ├── EmailVerificationTokenJpaMapper.java
        │       │   └── UserJpaMapper.java
        │       └── repository/
        │           ├── EmailVerificationTokenJpaRepository.java
        │           └── UserJpaRepository.java
        └── util/
            ├── EmailVerificationTokenConstants.java
            ├── Role.java
            ├── RoleConverter.java
            └── UserConstants.java
```

---

## 📦 Modules

### `auth` — Authentication

Handles registration, email verification, and user login. Generates JWT tokens with `id`, `role`, and `email` claims.

### `user` — Users

Manages the creation and retrieval of users (clients and providers). Includes email verification through tokens with configurable expiration.

### `service` — Professional Services

CRUD for the services offered by providers. Each service has a name, description, duration, price, cover photo, and address.

### `address` — Addresses

Reusable address model (country, state, city, street, postal code) associated with services.

### `home` — Home Screen

Public endpoint that returns the top 10 services and top 10 providers for the home screen.

---

## 🛠 Technologies and Dependencies

| Technology            | Version | Purpose                            |
| --------------------- | ------- | ---------------------------------- |
| **Java**              | 17      | Language                           |
| **Spring Boot**       | 3.5.3   | Main framework                     |
| **Spring Security**   | —       | Authentication and authorization   |
| **Spring Data JPA**   | —       | Persistence layer                  |
| **Spring Mail**       | —       | HTML email sending                 |
| **Spring WebSocket**  | —       | Real-time communication (prepared) |
| **Spring Validation** | —       | DTO and Command validation         |
| **PostgreSQL**        | —       | Relational database                |
| **java-jwt (auth0)**  | 4.5.0   | JWT generation and verification    |
| **Firebase Admin**    | 9.10.0  | File storage (Storage)             |
| **Lombok**            | —       | Boilerplate reduction              |
| **MapStruct**         | 1.6.3   | Typed mapping between layers       |
| **springdoc-openapi** | 2.8.9   | Swagger UI documentation           |
| **Gradle**            | 8.14.3  | Build tool                         |
| **JUnit 5**           | —       | Testing                            |

---

## 🔧 Reusable Services (Core)

### `EmailService`

Sends emails with a styled HTML template (colors, footer with copyright).

- Interface: `SendHtmlEmailUseCase`
- Parameters: `to`, `subject`, `title`, `body` (HTML)

### `StorageService`

Uploads and downloads files to/from Firebase Storage with unique names (timestamp + UUID).

- Interfaces: `UploadFileUseCase`, `DownloadFileUseCase`
- Generates public Firebase URLs

### Audit System (`core/auditable`)

- `AuditableEntity` — JPA superclass with `@CreatedBy`, `@CreatedDate`, `@LastModifiedBy`, `@LastModifiedDate`, soft-delete (`deletedAt`)
- `Auditable` — Domain record
- `AuditableDto` — Abstract base DTO
- Abstract mappers for JPA ↔ Domain and Domain → DTO

### Exception Hierarchy (`core/exception`)

- `AppException` (base) → `AlreadyExistsException` (409), `BadRequestException` (400), `ForbiddenException` (403), `NotFoundException` (404), `UnauthorizedException` (401)
- `AppExceptionHandler` — Centralized `@RestControllerAdvice` with standardized `ErrorResponse`
- `AppExceptionHandlerFilter` — Catches exceptions in security filters

### JWT Security (`core/security`)

- `JwtProvider` — Generates tokens with HMAC384, 7-day expiration
- `JwtFilter` — Validates Bearer tokens on each protected request
- `CustomUserDetailsService` — Loads users from DB via ports
- `UserPrincipal` — Record wrapping `UserDetails` + `userId`
- `SecurityConstants` — Whitelist and read-only routes

---

## 🌐 API Endpoints

### Auth (`/auth`)

| Method | Route                       | Description         | Access    |
| ------ | --------------------------- | ------------------- | --------- |
| `POST` | `/auth/register`            | Register a new user | 🔓 Public |
| `GET`  | `/auth/verify-email?token=` | Verify email        | 🔓 Public |
| `POST` | `/auth/log-in`              | Log in              | 🔓 Public |

### Home (`/home`)

| Method | Route   | Description                           | Access          |
| ------ | ------- | ------------------------------------- | --------------- |
| `GET`  | `/home` | Get home (top services and providers) | 🔓 Public (GET) |

### Services (`/services`)

| Method | Route                    | Description                            | Access                      |
| ------ | ------------------------ | -------------------------------------- | --------------------------- |
| `POST` | `/services`              | Create service (multipart)             | 🔒 Authenticated (PROVIDER) |
| `GET`  | `/services`              | List authenticated provider's services | 🔒 Authenticated            |
| `GET`  | `/services/details/{id}` | View service detail                    | 🔓 Public (GET)             |

### Users (`/users`)

| Method | Route                  | Description           | Access           |
| ------ | ---------------------- | --------------------- | ---------------- |
| `GET`  | `/users/provider/{id}` | View provider profile | 🔒 Authenticated |

### Documentation

| Route            | Description  |
| ---------------- | ------------ |
| `/swagger-ui/**` | Swagger UI   |
| `/v3/**`         | OpenAPI spec |

---

## 🔐 Security

- **Stateless authentication** with JWT (Bearer Token)
- **Password hashing** with BCrypt
- **Custom JWT filter** with configurable whitelist
- **Roles**: `CUSTOMER` (C) and `PROVIDER` (P), stored as `CHAR(1)` in the DB
- **Global soft delete** with `@SQLRestriction("deleted_date IS NULL")`
- **Email verification** with cryptographic tokens (SecureRandom) and configurable expiration
- **CORS** configured to allow all origins (development)

---

## ⚙ Configuration

The application uses environment variables for all sensitive configuration:

| Variable                                  | Description                                   |
| ----------------------------------------- | --------------------------------------------- |
| `CONTEXT_PATH`                            | API base path (e.g.: `/api/v1`)               |
| `DATABASE`                                | Database name                                 |
| `DB_URL`                                  | PostgreSQL connection URL                     |
| `DB_USERNAME`                             | Database username                             |
| `DB_PASSWORD`                             | Database password                             |
| `SHOW_SQL`                                | Show SQL queries (`true`/`false`)             |
| `JWT_SECRET_KEY`                          | Secret key for signing JWT                    |
| `MAIL_USERNAME`                           | Gmail email for sending                       |
| `MAIL_PASSWORD`                           | Gmail app password                            |
| `VERIFICATION_EXPIRATION_TIME_IN_MINUTES` | Verification token expiration time            |
| `FIREBASE_BUCKET_NAME`                    | Firebase Storage bucket name                  |
| `FIREBASE_CONFIG_PATH`                    | Path to `serviceAccountKey.json` in classpath |

---

## 🚀 Running

### Prerequisites

- Java 17+
- PostgreSQL
- Firebase account with Storage enabled
- Gmail account with App Password

### Run

```bash
# Clone the repository
git clone https://github.com/AlbenBustamante/book-now.git
cd book-now/api

# Set up environment variables (or create a .env file)

# Run with Gradle
./gradlew bootRun
```

The API will be available at `http://localhost:8080{CONTEXT_PATH}`.

The Swagger documentation will be at `http://localhost:8080{CONTEXT_PATH}/swagger-ui/index.html`.
