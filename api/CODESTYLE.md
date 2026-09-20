# 📏 BookNow API — Guía de Estilo de Código

Documento de referencia con las convenciones, patrones y prácticas de código adoptadas en el proyecto **BookNow API**.

---

## 📋 Tabla de Contenido

- [Lenguaje y Versión](#-lenguaje-y-versión)
- [Arquitectura y Organización](#-arquitectura-y-organización)
- [Convenciones de Nombres](#-convenciones-de-nombres)
- [Modelos de Dominio](#-modelos-de-dominio)
- [Puertos y Casos de Uso](#-puertos-y-casos-de-uso)
- [Servicios de Aplicación](#-servicios-de-aplicación)
- [DTOs](#-dtos)
- [Mappers (MapStruct)](#-mappers-mapstruct)
- [Entidades JPA](#-entidades-jpa)
- [Repositorios](#-repositorios)
- [Adaptadores REST](#-adaptadores-rest)
- [Controladores (RestApi)](#-controladores-restapi)
- [Excepciones](#-excepciones)
- [Anotaciones Personalizadas](#-anotaciones-personalizadas)
- [Variables y Tipos](#-variables-y-tipos)
- [Constantes](#-constantes)
- [Documentación (Javadoc)](#-documentación-javadoc)
- [Transacciones](#-transacciones)
- [Patrones Generales](#-patrones-generales)

---

## ☕ Lenguaje y Versión

- **Java 17** — Se usa extensivamente `var`, records, pattern matching (`instanceof`), text blocks
- **Spring Boot 3.5.3** — Jakarta EE (namespace `jakarta.*`)

---

## 🏛 Arquitectura y Organización

### Patrón: Arquitectura Hexagonal (Ports & Adapters)

```
module/<nombre>/
├── application/                # Lógica de negocio
│   ├── <Service>.java          # Implementación del caso de uso
│   └── port/
│       ├── in/                 # Puertos de entrada (use cases)
│       │   ├── <UseCase>.java  # Interfaz del caso de uso
│       │   └── command/        # Comandos de entrada (records validados)
│       └── out/                # Puertos de salida (driven ports)
│           ├── Load<X>Port.java
│           ├── Save<X>Port.java
│           ├── Check<X>Port.java
│           └── response/       # Respuestas específicas (records)
├── domain/                     # Modelos de dominio puros
├── exception/                  # Excepciones específicas del módulo
├── infrastructure/
│   ├── in/                     # Adaptadores de entrada (REST)
│   │   ├── <RestApi>.java      # Controlador Spring
│   │   ├── <RestAdapter>.java  # Capa intermedia entre controller y use case
│   │   ├── <Dto>.java          # DTO de respuesta
│   │   └── <DtoMapper>.java    # Mapper Domain → DTO
│   └── out/                    # Adaptadores de salida (Persistencia)
│       ├── <PersistenceAdapter>.java
│       └── persistence/
│           ├── <Entity>.java
│           ├── <JpaMapper>.java
│           └── <JpaRepository>.java
└── util/                       # Constantes y enums del módulo
```

### Separación Core vs Module

- `core/` — Componentes transversales reutilizables (seguridad, email, storage, excepciones, auditoría, configuración)
- `module/` — Módulos de negocio independientes (auth, user, service, address, home)

---

## 📛 Convenciones de Nombres

### Clases

| Tipo                            | Patrón                           | Ejemplo                                     |
| ------------------------------- | -------------------------------- | ------------------------------------------- |
| Modelo de dominio               | `<Nombre>` (sustantivo)          | `User`, `Service`, `Address`                |
| Caso de uso (interfaz)          | `<Verbo><Sustantivo>UseCase`     | `CreateUserUseCase`, `LogInUseCase`         |
| Servicio de aplicación          | `<Verbo><Sustantivo>Service`     | `CreateUserService`, `GetHomeService`       |
| Comando                         | `<Verbo><Sustantivo>Command`     | `CreateUserCommand`, `LogInCommand`         |
| Respuesta                       | `<Sustantivo>Response`           | `LogInResponse`                             |
| Puerto de entrada               | `<Verbo><Sustantivo>UseCase`     | `CreateServiceUseCase`                      |
| Puerto de salida (lectura)      | `Load<Sustantivo>Port`           | `LoadUserByIdPort`, `LoadTopServicesPort`   |
| Puerto de salida (escritura)    | `Save<Sustantivo>Port`           | `SaveUserPort`, `SaveServicePort`           |
| Puerto de salida (verificación) | `Check<Sustantivo>Port`          | `CheckEmailPort`, `CheckDniPort`            |
| Controlador REST                | `<Módulo>RestApi`                | `AuthRestApi`, `ServiceRestApi`             |
| Adaptador REST                  | `<Módulo>RestAdapter`            | `AuthRestAdapter`, `UserRestAdapter`        |
| DTO                             | `<Sustantivo>Dto`                | `UserDto`, `ServiceDto`, `HomeDto`          |
| Mapper DTO                      | `<Sustantivo>DtoMapper`          | `UserDtoMapper`, `ServiceDtoMapper`         |
| Entidad JPA                     | `<Sustantivo>Entity`             | `UserEntity`, `ServiceEntity`               |
| Mapper JPA                      | `<Sustantivo>JpaMapper`          | `UserJpaMapper`, `ServiceJpaMapper`         |
| Repositorio JPA                 | `<Sustantivo>JpaRepository`      | `UserJpaRepository`, `ServiceJpaRepository` |
| Adaptador de persistencia       | `<Sustantivo>PersistenceAdapter` | `UserPersistenceAdapter`                    |
| Excepción                       | `<Descripción>Exception`         | `UserNotFoundByIdException`                 |
| Constantes                      | `<Módulo>Constants`              | `UserConstants`, `ServiceConstants`         |

### Paquetes

- Todo en **minúsculas**, sin guiones ni guiones bajos
- Agrupados por módulo: `module.user`, `module.service`, `module.auth`
- Subpaquetes por capa: `application`, `domain`, `infrastructure.in`, `infrastructure.out`

### Métodos

- **Casos de uso**: verbos descriptivos — `create()`, `logIn()`, `verify()`, `getHome()`
- **Puertos de lectura**: `load<X>()`, `loadBy<X>()` — `loadByEmail()`, `loadById()`, `loadTopProviders()`
- **Puertos de escritura**: `save()` — siempre `save(DomainModel)`
- **Puertos de verificación**: `check<X>()` — `checkEmail()`, `checkDni()`
- **Mappers**: `toDto()`, `toDomain()`, `toEntity()`
- **Dominio (factory methods)**: `<Tipo>.create(...)` — `User.create(...)`, `Service.create(...)`
- **Dominio (copias inmutables)**: `copyWith<X>()`, `verifiedCopy()` — `user.copyWithHashedPassword(hash)`

---

## 🧩 Modelos de Dominio

### Reglas

1. **Siempre son Java Records** — inmutables por defecto
2. Incluyen un campo `Auditable auditable` para timestamps
3. Contienen **factory methods estáticos** `create(...)` para creación
4. Contienen **métodos de negocio** en el record — `passwordsDoMatch()`, `verifiedCopy()`
5. **No dependen** de ninguna capa de infraestructura (sin anotaciones JPA, sin Spring)
6. Usan `UUID` como tipo de ID
7. Documentados con Javadoc indicando cada `@param`

```java
// ✅ Ejemplo correcto
public record User(
        UUID id,
        String name,
        String email,
        Role role,
        Auditable auditable
) {
    public static User create(String name, String email, Role role) {
        return new User(null, name, email, role, null);
    }

    public User verifiedCopy() {
        return new User(id, name, email, role, auditable);
    }
}
```

---

## 🔌 Puertos y Casos de Uso

### Puertos de Entrada (Input Ports)

- Interfaces en `application/port/in/`
- Un **método por interfaz** (Interface Segregation Principle)
- Documentados con Javadoc

```java
public interface CreateUserUseCase {
    User create(CreateUserCommand command);
}
```

### Puertos de Salida (Output Ports)

- Interfaces en `application/port/out/`
- Nombrados según la operación: `Load<X>Port`, `Save<X>Port`, `Check<X>Port`
- Retornan `Optional<T>` para búsquedas que pueden no encontrar resultados

```java
public interface LoadUserByIdPort {
    Optional<User> loadById(UUID userId);
}
```

### Commands

- **Records** con validaciones de Bean Validation (`@NotBlank`, `@Email`, `@Min`, `@Length`)
- En `application/port/in/command/`
- Los mensajes de validación están en inglés y son descriptivos

```java
public record CreateUserCommand(
        @NotBlank(message = "The name is required")
        String name,
        @Email(message = "The email is not valid")
        String email
) {}
```

---

## ⚙ Servicios de Aplicación

- Anotados con `@UseCase` (anotación personalizada equivalente a `@Component`)
- Anotados con `@Transactional` (escritura) o `@Transactional(readOnly = true)` (lectura)
- Anotados con `@RequiredArgsConstructor` — inyección de dependencias por constructor (Lombok)
- Implementan **exactamente un** puerto de entrada (Use Case)
- Dependen solo de puertos de salida (interfaces), **nunca de implementaciones concretas**
- No contienen lógica de persistencia directa

```java
@UseCase
@Transactional
@RequiredArgsConstructor
public class CreateUserService implements CreateUserUseCase {
    private final SaveUserPort saveUserPort;
    private final CheckEmailPort checkEmailPort;
    private final PasswordEncoder passwordEncoder;
    // ...
}
```

---

## 📤 DTOs

### DTOs de respuesta (salida)

- Clases con `@Getter` y `@RequiredArgsConstructor` (Lombok) que extienden `AuditableDto`
- Los campos son `final` e inyectados por constructor
- **No son records** porque necesitan setters de `AuditableDto` para los campos de auditoría

```java
@Getter
@RequiredArgsConstructor
public class ServiceDto extends AuditableDto {
    private final UUID id;
    private final UserDto provider;
    private final String name, description;
    private final BigDecimal price;
}
```

### DTOs simples (sin auditoría)

- Pueden ser **records** cuando no necesitan herencia

```java
public record HomeDto(List<ServiceDto> services, List<UserDto> providers) {}
public record ProviderDto(UserDto user, float average, int completedServices, List<ServiceDto> services) {}
```

### Múltiples campos en una línea

- Se agrupan campos del mismo tipo en una sola declaración:

```java
private final String name, lastName, photoUrl, email, occupation, biography;
```

---

## 🗺 Mappers (MapStruct)

### Convenciones

- Todos usan `componentModel = "spring"` para integración con Spring
- Son **clases abstractas** (no interfaces) cuando extienden `AuditableDtoMapper` o `AuditableJpaMapper`
- Son **interfaces** cuando no necesitan herencia
- Usan `unmappedTargetPolicy = ReportingPolicy.IGNORE` en los JPA mappers
- Declaran `uses = {...}` para componer mappers anidados

### JPA Mappers (Domain ↔ Entity)

- Extienden `AuditableJpaMapper`
- Usan `@Mapping(target = "auditable", expression = "java(toAbstractDomain(entity))")` para mapear auditoría en `toDomain()`
- Usan `@AfterMapping` para mapear auditoría en `toEntity()`

```java
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class UserJpaMapper extends AuditableJpaMapper {
    @Mapping(target = "auditable", expression = "java(toAbstractDomain(entity))")
    public abstract User toDomain(UserEntity entity);

    public abstract UserEntity toEntity(User domain);

    @AfterMapping
    protected void mapAuditEntity(User domain, @MappingTarget UserEntity entity) {
        mapAbstractAuditEntity(domain.auditable(), entity);
    }
}
```

### DTO Mappers (Domain → DTO)

- Extienden `AuditableDtoMapper`
- Usan `@AfterMapping` para mapear los campos de auditoría

```java
@Mapper(componentModel = "spring")
public abstract class ServiceDtoMapper extends AuditableDtoMapper {
    public abstract ServiceDto toDto(Service domain);

    @AfterMapping
    protected void mapAuditFields(Service domain, @MappingTarget ServiceDto dto) {
        mapAbstractAuditFields(domain.auditable(), dto);
    }
}
```

---

## 🗄 Entidades JPA

- Extienden `AuditableEntity` (herencia `@MappedSuperclass`)
- Anotadas con `@Setter`, `@Getter`, `@Entity`, `@Table`
- Soft delete con `@SQLDelete` y `@SQLRestriction("deleted_date IS NULL")` (heredado)
- IDs tipo `UUID` con `@GeneratedValue(strategy = GenerationType.UUID)`
- Longitudes de columnas definidas por constantes estáticas del paquete `util/`
- Cada campo documentado con Javadoc

```java
@Setter
@Getter
@Entity
@Table(name = "services")
@SQLDelete(sql = "UPDATE services SET delete_at = NOW() WHERE id = ?")
public class ServiceEntity extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = NAME_LENGTH)
    private String name;
    // ...
}
```

---

## 📚 Repositorios

- Interfaces que extienden `JpaRepository<Entity, UUID>`
- Solo contienen firmas de métodos derivados de Spring Data JPA
- Documentados con Javadoc

```java
public interface UserJpaRepository extends JpaRepository<UserEntity, UUID> {
    boolean existsByEmail(String email);
    Optional<UserEntity> findByEmail(String email);
    List<UserEntity> findTop10ByRole(Role role);
}
```

---

## 🌐 Adaptadores REST

### RestAdapter

- Anotados con `@RestAdapter` (anotación personalizada)
- Anotados con `@RequiredArgsConstructor`
- Actúan como **capa intermedia** entre el controlador y los casos de uso
- Contienen la lógica de **mapeo de dominio a DTO**
- **No** llevan anotaciones de Spring MVC (`@GetMapping`, etc.)

```java
@RestAdapter
@RequiredArgsConstructor
public class ServiceRestAdapter {
    private final ServiceDtoMapper mapper;
    private final CreateServiceUseCase createServiceUseCase;

    public ServiceDto create(CreateServiceCommand command, MultipartFile coverPhoto) throws IOException {
        return mapper.toDto(createServiceUseCase.create(command, coverPhoto));
    }
}
```

---

## 🎯 Controladores (RestApi)

- Anotados con `@RestController` y `@RequestMapping(path = "/...")`
- Anotados con `@RequiredArgsConstructor`
- **NO** usan `@RestAdapter` — usan las anotaciones estándar de Spring
- Solo delegan al `RestAdapter`, **sin lógica de negocio**
- Usan `ResponseEntity<T>` como retorno
- Validación con `@Valid` en los parámetros del body

```java
@RequiredArgsConstructor
@RequestMapping(path = "/services")
@RestController
public class ServiceRestApi {
    private final ServiceRestAdapter adapter;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ServiceDto> create(
            @Valid @RequestPart("service") CreateServiceCommand command,
            @NotNull @RequestPart("coverPhoto") MultipartFile coverPhoto
    ) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(adapter.create(command, coverPhoto));
    }
}
```

---

## 🚨 Excepciones

### Jerarquía

```
RuntimeException
  └── AppException (abstract, contiene HttpStatus)
        ├── AlreadyExistsException (abstract, 409)
        │     ├── UserAlreadyExistsByEmailException
        │     ├── AccountAlreadyVerifiedException
        │     └── EmailAlreadyVerifiedException
        ├── BadRequestException (abstract, 400)
        │     ├── BadCredentialsException
        │     └── EmailVerificationTokenExpiredException
        ├── NotFoundException (404)
        │     ├── UserNotFoundByIdException
        │     ├── ServiceNotFoundException
        │     └── EmailVerificationTokenNotFoundException
        ├── ForbiddenException (403)
        │     └── UserHasNotPrivilegesToCreateServiceException
        └── UnauthorizedException (401)
```

### Convenciones

- Las excepciones de dominio **son específicas y descriptivas** — `UserAlreadyExistsByEmailException`, no `DuplicateException`
- Cada excepción define su **mensaje en el constructor** — `super("User with ID #" + id + " not found")`
- Los constructores sin parámetros usan mensajes fijos: `super("The passwords do not match")`
- El `AppExceptionHandler` centraliza todas las respuestas de error con un formato `ErrorResponse` uniforme

### Formato de Respuesta de Error

```json
{
  "message": "User with ID #... not found",
  "path": "/api/v1/users/...",
  "statusName": "NOT_FOUND",
  "statusCode": 404,
  "timestamp": "20/09/2026 16:48:58"
}
```

---

## 🏷 Anotaciones Personalizadas

| Anotación             | Equivale a   | Se usa en                          |
| --------------------- | ------------ | ---------------------------------- |
| `@UseCase`            | `@Component` | Servicios de aplicación            |
| `@RestAdapter`        | `@Component` | Adaptadores REST (capa intermedia) |
| `@PersistenceAdapter` | `@Component` | Adaptadores de persistencia        |

Todas son meta-anotaciones de `@Component` con `@AliasFor`, lo que las hace detectables por el component scan de Spring.

---

## 📝 Variables y Tipos

### Uso extensivo de `var`

- Se usa `final var` para todas las variables locales cuyo tipo es inferible
- Solo se escribe el tipo explícito cuando `var` reduce la claridad

```java
// ✅ Estilo del proyecto
final var user = loadUserByEmailPort.loadByEmail(command.email())
        .orElseThrow(BadCredentialsException::new);

final var authToken = new UsernamePasswordAuthenticationToken(command.email(), command.password());
```

### `final` por defecto

- Todas las variables locales se declaran como `final var`
- Los campos de servicios son `private final` (inyectados por constructor vía `@RequiredArgsConstructor`)
- Excepción: variables que se reasignan (ej: `var user = ...; user = user.copyWithHashedPassword(hash);`)

---

## 📐 Constantes

- Definidas en clases `final` con constructor privado (prevenir instanciación)
- Agrupadas por módulo en el paquete `util/`
- Referenciadas por import estático en las entidades

```java
public final class UserConstants {
    public static final int NAME_LENGTH = 30;
    public static final int EMAIL_LENGTH = 300;

    private UserConstants() {}
}
```

```java
import static dev.alben.booknowapi.module.user.util.UserConstants.*;

@Column(nullable = false, length = NAME_LENGTH)
private String name;
```

---

## 📖 Documentación (Javadoc)

### Dónde se documenta

- ✅ **Records de dominio** — con `@param` para cada campo
- ✅ **Interfaces de puertos** (Use Cases y Ports) — con `@param`, `@return`, `@throws`
- ✅ **Interfaces de repositorios** — métodos con `@param` y `@return`
- ✅ **Campos de entidades JPA** — descripción breve
- ✅ **Clases abstractas del core** — descripción del propósito
- ❌ **Servicios de aplicación** — generalmente sin Javadoc (la interfaz ya lo tiene)
- ❌ **DTOs de salida** — generalmente sin Javadoc detallado

### Estilo

```java
/**
 * Domain model for users.
 *
 * @param id       ID.
 * @param name     first name.
 * @param email    registered email.
 * @param role     system role.
 */
public record User(...) {}
```

```java
/**
 * Use case for users creation.
 */
public interface CreateUserUseCase {
    /**
     * Persist a new user through a command.
     *
     * @param command {@link CreateUserCommand} data.
     * @return {@link User} data.
     */
    User create(CreateUserCommand command);
}
```

---

## 🔄 Transacciones

| Caso                               | Anotación                                         |
| ---------------------------------- | ------------------------------------------------- |
| Escritura (create, update, delete) | `@Transactional`                                  |
| Solo lectura (get, list)           | `@Transactional(readOnly = true)`                 |
| Aplicada en                        | Clases de servicio de aplicación (nivel de clase) |

---

## 🧱 Patrones Generales

### 1. Inyección por Constructor

Siempre vía `@RequiredArgsConstructor` de Lombok. No se usa `@Autowired`.

### 2. Inmutabilidad

- Dominio: Records (inmutables). Cambios mediante métodos `copy*()` que retornan nuevas instancias.
- Campos de servicios: `private final`.

### 3. Optional para Búsquedas

- Los puertos de salida retornan `Optional<T>` para búsquedas por ID o atributo único.
- Los servicios usan `.orElseThrow(() -> new <Exception>(...))` para convertir a excepciones.

### 4. Soft Delete

- Todas las entidades tienen `deletedAt` (heredado de `AuditableEntity`).
- Se usa `@SQLDelete` para UPDATE en vez de DELETE.
- Se usa `@SQLRestriction("deleted_date IS NULL")` para filtrar registros eliminados.

### 5. Separación Controller → Adapter → UseCase

El controlador (`RestApi`) delega al adaptador (`RestAdapter`), que mapea y llama al caso de uso. Esto desacopla la capa HTTP de la lógica de negocio.

### 6. Un Use Case por Servicio

Cada servicio de aplicación implementa **una sola interfaz de Use Case** (Single Responsibility Principle).

### 7. Convención de HTTP Status

- `201 CREATED` para creación exitosa
- `200 OK` para lecturas y login
- Errores mapeados por la jerarquía de excepciones

### 8. Paginación

- Se usa `Page<T>` y `Pageable` de Spring Data para listados
- Los controladores reciben `pageNumber` y `pageSize` como `@RequestParam`

### 9. Logging

- Se usa `@Slf4j` (Lombok) en el `AppExceptionHandler`
- Formato: `log.error("EXCEPTION TYPE: {} - PATH: {}", message, path, exception)`
