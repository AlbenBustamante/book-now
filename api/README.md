# 📅 BookNow API

API REST para una plataforma de reservas de servicios, donde **proveedores** publican sus servicios profesionales y **clientes** pueden explorarlos, ver detalles y (próximamente) agendar citas.

## 📋 Tabla de Contenido

- [Descripción General](#-descripción-general)
- [Arquitectura](#-arquitectura)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Módulos](#-módulos)
- [Tecnologías y Dependencias](#-tecnologías-y-dependencias)
- [Servicios Reutilizables](#-servicios-reutilizables-core)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Seguridad](#-seguridad)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)

---

## 🎯 Descripción General

**BookNow** es una plataforma que conecta proveedores de servicios con clientes. Los proveedores pueden registrarse, verificar su email, crear servicios con foto de portada y dirección, mientras que los clientes pueden explorar el catálogo de servicios y ver los perfiles de los proveedores.

### Funcionalidades principales

- **Registro de usuarios** (clientes y proveedores) con verificación de email
- **Autenticación** basada en JWT (JSON Web Tokens)
- **Gestión de servicios** — CRUD para proveedores con carga de fotos a Firebase Storage
- **Home público** — Muestra los servicios y proveedores destacados (top 10)
- **Detalle de servicio** — Vista detallada con reseñas y calificación promedio
- **Perfil de proveedor** — Información pública del proveedor

---

## 🏛 Arquitectura

El proyecto implementa **Arquitectura Hexagonal (Ports & Adapters)**, inspirada en los principios de "Get Your Hands Dirty on Clean Architecture" de Tom Hombergs.

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

### Capas

| Capa                     | Responsabilidad                                          | Anotación Personalizada |
| ------------------------ | -------------------------------------------------------- | ----------------------- |
| **Domain**               | Modelos de negocio puros (records) con lógica de dominio | —                       |
| **Application**          | Casos de uso, puertos de entrada/salida, comandos        | `@UseCase`              |
| **Infrastructure (in)**  | Adaptadores REST, DTOs, mappers DTO                      | `@RestAdapter`          |
| **Infrastructure (out)** | Adaptadores de persistencia, entidades JPA, mappers JPA  | `@PersistenceAdapter`   |

---

## 📁 Estructura del Proyecto

```
src/main/java/dev/alben/booknowapi/
├── BookNowApiApplication.java
│
├── core/                              # Componentes compartidos (cross-cutting)
│   ├── auditable/                     # Sistema de auditoría (createdAt, updatedBy, etc.)
│   │   ├── Auditable.java            # Record de dominio
│   │   ├── AuditableDto.java         # DTO base abstracto
│   │   ├── AuditableDtoMapper.java   # Mapper abstracto Domain → DTO
│   │   ├── AuditableEntity.java      # @MappedSuperclass con JPA Auditing
│   │   └── AuditableJpaMapper.java   # Mapper abstracto Domain ↔ Entity
│   ├── common/                        # Anotaciones personalizadas
│   │   ├── PersistenceAdapter.java   # @Component alias para persistence
│   │   ├── RestAdapter.java          # @Component alias para REST
│   │   └── UseCase.java             # @Component alias para casos de uso
│   ├── config/                        # Configuraciones Spring
│   │   ├── CorsConfig.java
│   │   ├── FirebaseConfig.java
│   │   ├── JpaConfig.java
│   │   └── SecurityConfig.java
│   ├── email/                         # Servicio de emails
│   │   ├── EmailService.java
│   │   ├── EmailSenderException.java
│   │   └── usecase/
│   │       └── SendHtmlEmailUseCase.java
│   ├── exception/                     # Jerarquía global de excepciones
│   │   ├── AppException.java         # Excepción base abstracta
│   │   ├── AppExceptionHandler.java  # @RestControllerAdvice
│   │   ├── AppExceptionHandlerFilter.java
│   │   ├── ErrorResponse.java        # Record de respuesta de error
│   │   ├── AlreadyExistsException.java  # → 409 CONFLICT
│   │   ├── BadRequestException.java     # → 400 BAD REQUEST
│   │   ├── ForbiddenException.java      # → 403 FORBIDDEN
│   │   ├── NotFoundException.java       # → 404 NOT FOUND
│   │   └── UnauthorizedException.java   # → 401 UNAUTHORIZED
│   ├── security/                      # Autenticación y autorización JWT
│   │   ├── CustomUserDetailsService.java
│   │   ├── JwtFilter.java
│   │   ├── JwtProvider.java
│   │   ├── SecurityConstants.java
│   │   └── UserPrincipal.java
│   └── storage/                       # Servicio de almacenamiento (Firebase)
│       ├── StorageService.java
│       └── usecase/
│           ├── DownloadFileUseCase.java
│           └── UploadFileUseCase.java
│
└── module/                            # Módulos de negocio
    ├── address/                       # Módulo: Direcciones
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
    ├── auth/                          # Módulo: Autenticación
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
    ├── home/                          # Módulo: Home (pantalla principal)
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
    ├── service/                       # Módulo: Servicios profesionales
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
    └── user/                          # Módulo: Usuarios
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

## 📦 Módulos

### `auth` — Autenticación

Maneja el registro, la verificación de email y el login de usuarios. Genera tokens JWT con claims de `id`, `role` y `email`.

### `user` — Usuarios

Gestiona la creación y consulta de usuarios (clientes y proveedores). Incluye verificación de email mediante tokens con expiración configurable.

### `service` — Servicios Profesionales

CRUD de los servicios que ofrecen los proveedores. Cada servicio tiene nombre, descripción, duración, precio, foto de portada y dirección.

### `address` — Direcciones

Modelo de dirección reutilizable (país, estado, ciudad, calle, código postal) asociado a los servicios.

### `home` — Pantalla Principal

Endpoint público que devuelve los top 10 servicios y top 10 proveedores para la pantalla de inicio.

---

## 🛠 Tecnologías y Dependencias

| Tecnología            | Versión | Propósito                               |
| --------------------- | ------- | --------------------------------------- |
| **Java**              | 17      | Lenguaje                                |
| **Spring Boot**       | 3.5.3   | Framework principal                     |
| **Spring Security**   | —       | Autenticación y autorización            |
| **Spring Data JPA**   | —       | Capa de persistencia                    |
| **Spring Mail**       | —       | Envío de emails HTML                    |
| **Spring WebSocket**  | —       | Comunicación en tiempo real (preparado) |
| **Spring Validation** | —       | Validación de DTOs y Commands           |
| **PostgreSQL**        | —       | Base de datos relacional                |
| **java-jwt (auth0)**  | 4.5.0   | Generación y verificación de JWT        |
| **Firebase Admin**    | 9.10.0  | Almacenamiento de archivos (Storage)    |
| **Lombok**            | —       | Reducción de boilerplate                |
| **MapStruct**         | 1.6.3   | Mapeo tipado entre capas                |
| **springdoc-openapi** | 2.8.9   | Documentación Swagger UI                |
| **Gradle**            | 8.14.3  | Build tool                              |
| **JUnit 5**           | —       | Testing                                 |

---

## 🔧 Servicios Reutilizables (Core)

### `EmailService`

Envía emails con plantilla HTML estilizada (colores, footer con copyright).

- Interfaz: `SendHtmlEmailUseCase`
- Parámetros: `to`, `subject`, `title`, `body` (HTML)

### `StorageService`

Sube y descarga archivos a/desde Firebase Storage con nombres únicos (timestamp + UUID).

- Interfaces: `UploadFileUseCase`, `DownloadFileUseCase`
- Genera URLs públicas de Firebase

### Sistema de Auditoría (`core/auditable`)

- `AuditableEntity` — Superclase JPA con `@CreatedBy`, `@CreatedDate`, `@LastModifiedBy`, `@LastModifiedDate`, soft-delete (`deletedAt`)
- `Auditable` — Record de dominio
- `AuditableDto` — DTO base abstracto
- Mappers abstractos para JPA ↔ Domain y Domain → DTO

### Jerarquía de Excepciones (`core/exception`)

- `AppException` (base) → `AlreadyExistsException` (409), `BadRequestException` (400), `ForbiddenException` (403), `NotFoundException` (404), `UnauthorizedException` (401)
- `AppExceptionHandler` — `@RestControllerAdvice` centralizado con respuesta estandarizada `ErrorResponse`
- `AppExceptionHandlerFilter` — Captura excepciones en los filtros de seguridad

### Seguridad JWT (`core/security`)

- `JwtProvider` — Genera tokens con HMAC384, expiración de 7 días
- `JwtFilter` — Valida Bearer tokens en cada request protegido
- `CustomUserDetailsService` — Carga usuarios desde DB via puertos
- `UserPrincipal` — Record que envuelve `UserDetails` + `userId`
- `SecurityConstants` — Whitelist y rutas de solo lectura

---

## 🌐 Endpoints de la API

### Auth (`/auth`)

| Método | Ruta                        | Descripción             | Acceso     |
| ------ | --------------------------- | ----------------------- | ---------- |
| `POST` | `/auth/register`            | Registrar nuevo usuario | 🔓 Público |
| `GET`  | `/auth/verify-email?token=` | Verificar email         | 🔓 Público |
| `POST` | `/auth/log-in`              | Iniciar sesión          | 🔓 Público |

### Home (`/home`)

| Método | Ruta    | Descripción                                | Acceso           |
| ------ | ------- | ------------------------------------------ | ---------------- |
| `GET`  | `/home` | Obtener home (top servicios y proveedores) | 🔓 Público (GET) |

### Services (`/services`)

| Método | Ruta                     | Descripción                                | Acceso                    |
| ------ | ------------------------ | ------------------------------------------ | ------------------------- |
| `POST` | `/services`              | Crear servicio (multipart)                 | 🔒 Autenticado (PROVIDER) |
| `GET`  | `/services`              | Listar servicios del proveedor autenticado | 🔒 Autenticado            |
| `GET`  | `/services/details/{id}` | Ver detalle de un servicio                 | 🔓 Público (GET)          |

### Users (`/users`)

| Método | Ruta                   | Descripción                | Acceso         |
| ------ | ---------------------- | -------------------------- | -------------- |
| `GET`  | `/users/provider/{id}` | Ver perfil de un proveedor | 🔒 Autenticado |

### Documentación

| Ruta             | Descripción  |
| ---------------- | ------------ |
| `/swagger-ui/**` | Swagger UI   |
| `/v3/**`         | OpenAPI spec |

---

## 🔐 Seguridad

- **Autenticación stateless** con JWT (Bearer Token)
- **Hashing de contraseñas** con BCrypt
- **Filtro JWT** personalizado con whitelist configurable
- **Roles**: `CUSTOMER` (C) y `PROVIDER` (P), almacenados como `CHAR(1)` en la BD
- **Soft delete** global con `@SQLRestriction("deleted_date IS NULL")`
- **Verificación de email** con tokens criptográficos (SecureRandom) y expiración configurable
- **CORS** configurado para permitir todos los orígenes (desarrollo)

---

## ⚙ Configuración

La aplicación usa variables de entorno para toda la configuración sensible:

| Variable                                  | Descripción                                    |
| ----------------------------------------- | ---------------------------------------------- |
| `CONTEXT_PATH`                            | Path base de la API (ej: `/api/v1`)            |
| `DATABASE`                                | Nombre de la base de datos                     |
| `DB_URL`                                  | URL de conexión a PostgreSQL                   |
| `DB_USERNAME`                             | Usuario de la BD                               |
| `DB_PASSWORD`                             | Contraseña de la BD                            |
| `SHOW_SQL`                                | Mostrar queries SQL (`true`/`false`)           |
| `JWT_SECRET_KEY`                          | Clave secreta para firmar JWT                  |
| `MAIL_USERNAME`                           | Email de Gmail para envíos                     |
| `MAIL_PASSWORD`                           | App password de Gmail                          |
| `VERIFICATION_EXPIRATION_TIME_IN_MINUTES` | Tiempo de expiración del token de verificación |
| `FIREBASE_BUCKET_NAME`                    | Nombre del bucket de Firebase Storage          |
| `FIREBASE_CONFIG_PATH`                    | Ruta al `serviceAccountKey.json` en classpath  |

---

## 🚀 Ejecución

### Prerrequisitos

- Java 17+
- PostgreSQL
- Cuenta de Firebase con Storage habilitado
- Cuenta de Gmail con App Password

### Ejecutar

```bash
# Clonar el repositorio
git clone https://github.com/AlbenBustamante/book-now.git
cd book-now/api

# Configurar variables de entorno (o crear un .env)

# Ejecutar con Gradle
./gradlew bootRun
```

La API estará disponible en `http://localhost:8080{CONTEXT_PATH}`.

La documentación Swagger estará en `http://localhost:8080{CONTEXT_PATH}/swagger-ui/index.html`.
