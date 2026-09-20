# Code Style Guide — BookNow Client

Code style and conventions adopted in the project.

---

## 1. Language and Compiler Configuration

### TypeScript Strict Mode (Full)

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "isolatedModules": true,
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
  },
  "angularCompilerOptions": {
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true,
  },
}
```

### EditorConfig

```ini
indent_style = space
indent_size = 2
charset = utf-8
insert_final_newline = true
trim_trailing_whitespace = true
quote_type = single          # For .ts files
```

### Linter and Formatter

> **Current state**: No ESLint or Prettier configured. It is recommended to integrate `@angular-eslint/schematics` and Prettier to enforce conventions automatically.

---

## 2. Naming Conventions

### Files

| Type         | Pattern                                         | Example                      |
| :----------- | :---------------------------------------------- | :--------------------------- |
| Component    | `kebab-case.component.ts/html/css`              | `result-card.component.ts`   |
| Service      | `kebab-case.service.ts`                         | `get-details.service.ts`     |
| Store        | `kebab-case.store.ts`                           | `service.store.ts`           |
| Interceptor  | `kebab-case.interceptor.ts`                     | `jwt.interceptor.ts`         |
| Guard        | `kebab-case.guard.ts`                           | `account.guard.ts`           |
| Directive    | `kebab-case.directive.ts`                       | `click-outside.directive.ts` |
| Model        | `kebab-case.model.ts`                           | `user.model.ts`              |
| Enum         | `kebab-case.enum.ts`                            | `role.enum.ts`               |
| Type         | `kebab-case.type.ts`                            | `status.type.ts`             |
| Routes       | `kebab-case.routes.ts`                          | `main-layout.routes.ts`      |
| HTTP Context | `kebab-case.context.ts`                         | `jwt.context.ts`             |
| Environment  | `environment.ts` / `environment.development.ts` | —                            |

### Classes, Interfaces, and Types

| Type                     | Convention               | Example                           |
| :----------------------- | :----------------------- | :-------------------------------- |
| Component                | `PascalCase + Component` | `ResultCardComponent`             |
| Service                  | `PascalCase + Service`   | `GetDetailsService`               |
| Store                    | `PascalCase + Store`     | `ServiceStore`, `LogInStore`      |
| Interface/Model          | `PascalCase + Model`     | `UserModel`, `ServiceDetailModel` |
| Enum                     | `PascalCase`             | `Role`                            |
| Type                     | `PascalCase`             | `Status`                          |
| Directive                | `PascalCase + Directive` | `ClickOutsideDirective`           |
| Interceptor (functional) | `camelCase`              | `jwtInterceptor`                  |
| HTTP Context             | `UPPER_SNAKE_CASE`       | `JWT_CONTEXT`                     |
| Utility function         | `camelCase + Fn`         | `skipJwtFn`                       |

### Component Selectors

- **Prefix**: `app-` (configured in `angular.json`)
- **Format**: `app-kebab-case`
- **Examples**: `app-button`, `app-service-card`, `app-navbar-search-input`
- **Exception (SVG)**: Attribute selector `svg[search-icon]` for inline SVG components without DOM wrapper.

### Class Properties

```typescript
// Services injected with inject() — underscore prefix + readonly
private readonly _authService = inject(AuthService);
private readonly _router = inject(Router);

// State signals — readonly
readonly searching = signal<boolean>(false);
readonly showDropdown = signal<boolean>(false);

// Signal inputs — readonly
readonly text = input.required<string>();
readonly color = input<'primary' | 'gray'>('primary');

// Signal outputs — readonly
readonly onClick = output<void>();
readonly onSearch = output<string>();

// Computed signals — readonly
readonly fullStars = computed(() => Math.floor(this.review().rate));
```

---

## 3. Angular Components

### Component Structure (Standard Template)

```typescript
@Component({
  selector: "app-example",
  imports: [DependencyA, DependencyB],
  templateUrl: "./example.component.html",
  styleUrl: "./example.component.css",
})
export class ExampleComponent {
  // 1. Dependency injection (inject())
  private readonly _service = inject(ExampleService);

  // 2. Signal Inputs
  readonly data = input.required<DataModel>();
  readonly label = input<string>("default");

  // 3. Signal Outputs
  readonly onAction = output<void>();

  // 4. State signals
  readonly isOpen = signal<boolean>(false);

  // 5. Computed signals
  readonly displayName = computed(() => this.data().name.toUpperCase());

  // 6. Effects (in constructor)
  constructor() {
    effect(() => {
      // reactive side-effects
    });
  }

  // 7. Public methods
  toggle(): void {
    this.isOpen.update((v) => !v);
  }
}
```

### Key Principles

- **100% Standalone** — No `NgModule` used. Angular 19 defaults to `standalone: true`, so it is not explicitly declared.
- **Explicit imports** — Each component declares its dependencies in `imports: [...]`.
- **Separate files** — Template (`.html`), styles (`.css`), and logic (`.ts`) in independent files. Uses `templateUrl` and `styleUrl`, not inline templates.
- **Standard CSS** — `.css` stylesheets (not SCSS or LESS).
- **No barrel exports** — Imports are made directly to the source file, without `index.ts`.

---

## 4. Dependency Injection

### Preferred Pattern: `inject()`

```typescript
// ✅ Modern style — preferred
private readonly _service = inject(MyService);
private readonly _router = inject(Router);
```

### Legacy Pattern: Constructor

```typescript
// ⚠️ Still used in some components (mainly for FormBuilder)
constructor(private readonly _fb: FormBuilder) {}
```

> **Note**: There is an inconsistency in the codebase where some components mix both styles. It is recommended to standardize to `inject()` across the board.

### Visibility Convention

- Services injected for internal use only: `private readonly` with `_` prefix.
- Services needed in the template: `readonly` without `_` prefix (e.g., `readonly authService = inject(AuthService);`).

---

## 5. State Management (NgRx SignalStore)

### Store Structure

```typescript
export const ExampleStore = signalStore(
  withState<ExampleState>({
    status: "pending" as Status,
    data: null,
    error: null,
  }),

  withComputed((store) => ({
    isLoading: computed(() => store.status() === "loading"),
  })),

  withMethods((store, service = inject(DataService)) => ({
    fetchData(): void {
      patchState(store, { status: "loading" });
      service.getData().subscribe({
        next: (data) => patchState(store, { data, status: "success" }),
        error: (err) => patchState(store, { error: err.message, status: "failure" }),
      });
    },
  })),
);
```

### Type `Status`

```typescript
type Status = "pending" | "loading" | "success" | "failure";
```

Used consistently across all stores to represent the state of asynchronous operations.

### Component-Level Provision

Stores are provided at the component level (not global):

```typescript
@Component({
  providers: [ExampleStore],
  // ...
})
export class ExampleComponent {
  readonly store = inject(ExampleStore);
}
```

---

## 6. HTML Templates

### Control Flow (Angular 17+ Syntax)

```html
<!-- ✅ Used — New native control flow -->
@if (condition()) {
<div>Visible</div>
} @else {
<div>Fallback</div>
} @for (item of items(); track item.id) {
<app-card [data]="item" />
}

<!-- ❌ Not used — Legacy structural directives -->
<div *ngIf="condition">...</div>
<div *ngFor="let item of items">...</div>
```

### Data Binding

```html
<!-- Property binding with signal -->
<app-title [headline]="title()" />

<!-- Event binding -->
<button (click)="toggle()">Click</button>

<!-- Two-way binding with model() -->
<app-input [(value)]="name" />

<!-- Reading signals in templates -->
<span>{{ user().name }}</span>
```

### Self-Closing Component Tags

```html
<!-- ✅ Used — Self-closing tags for components without content projection -->
<app-navbar />
<app-footer />
<app-divisor />

<!-- ✅ Used — Open tags when content projection is needed -->
<app-card>
  <p>Projected content</p>
</app-card>
```

---

## 7. CSS Styles

### Framework: Tailwind CSS v4

- **CSS-first configuration** — No `tailwind.config.js` file. Configuration is defined directly in `styles.css` using `@theme` and `@theme inline` directives.
- **Utility classes** — Applied directly in HTML templates.
- **Component styles** — Individual `.css` files per component with encapsulated styles (default ViewEncapsulation).

### Design Tokens

```css
/* Typography */
--font-poppins: Poppins, sans-serif; /* Main font (Google Fonts) */

/* Color palette */
--color-primary-*: var(--color-cyan- *); /* Primary = Cyan (50-950) */
--color-gray-*: var(--color-neutral- *); /* Gray = Neutral (50-950) */
```

### Global CSS Components

```css
@layer components {
  .input {
    @apply flex flex-col gap-1.5;
  }
  .input label {
    @apply text-sm sm:text-base text-gray-700 tracking-tighter font-medium;
  }
  .input input,
  .input textarea,
  .input select {
    @apply outline-none px-2.5 sm:px-3.5 py-1.5 rounded-2xl text-sm sm:text-base
           text-gray-700 border-2 border-gray-200 bg-gray-50
           active:ring-1 active:ring-primary-600 active:border-primary-600
           focus:ring-1 focus:ring-primary-600 focus:border-primary-600
           active:shadow-lg focus:shadow-md transition-all
           placeholder-gray-400 disabled:bg-gray-100;
  }
}
```

### Common Style Patterns in Components

```css
/* Responsive layout */
class="container mx-auto px-3.5 md:px-5"

/* Minimum content height */
class="min-h-[calc(100dvh-4rem)]"

/* Horizontal scroll for carousels */
class="overflow-x-auto"

/* Buttons with dynamic color variants */
class="rounded-2xl font-medium transition-all"
```

### Methodology

- **BEM is not used** — Relies on Tailwind utility classes.
- **Encapsulation** — Component styles are encapsulated by default (Angular ViewEncapsulation.Emulated).
- **Responsive Design** — Uses Tailwind breakpoints (`sm:`, `md:`, `lg:`).

---

## 8. Forms

### Pattern: Reactive Forms

```typescript
// All forms are Reactive (FormBuilder + FormGroup)
constructor(private readonly _fb: FormBuilder) {}

readonly form = this._fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required]],
});
```

### Reusable Form Components

Inputs connect directly to a `FormControl` passed as an input:

```html
<app-input name="email" label="Email" type="email" placeholder="user@example.com" [control]="form.controls.email" />
```

### Validation

- Native `Validators` from `@angular/forms` are used (`required`, `email`, `min`, `maxLength`).
- No custom global validators exist.

---

## 9. Routing

### Conventions

```typescript
// Lazy loading with loadComponent (single component)
{ path: 'search', loadComponent: () => import('./search.component').then(c => c.SearchComponent) }

// Lazy loading with loadChildren (sub-routes)
{ path: 'settings', loadChildren: () => import('./settings.routes').then(r => r.routes) }

// Component Input Binding enabled globally
provideRouter(routes, withComponentInputBinding())
```

### Route Files

- Each feature exports a `routes: Routes` array from a dedicated `*.routes.ts` file.
- No resolvers are used. Data is loaded from the components/stores themselves.

---

## 10. HTTP Communication

### JWT Interceptor (Functional)

```typescript
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Check if JWT should be skipped (skipJwtFn)
  // 2. Clone request with Authorization: Bearer <token> header
  // 3. Catch 401 → automatic logout
};
```

### HTTP Context for Public Requests

```typescript
// Mark requests that should NOT carry JWT
this._http.get<Data[]>(url, { context: skipJwtFn() });
```

### HTTP Service Pattern

```typescript
@Injectable({ providedIn: "root" })
export class DataService {
  private readonly _http = inject(HttpClient);

  getData(): Observable<Data[]> {
    return this._http.get<Data[]>(`${environment.apiUrl}/data`);
  }
}
```

---

## 11. SVG Icon Components

Specialized pattern for SVG icons without additional DOM wrapper:

```typescript
@Component({
  selector: "svg[search-icon]",
  template: `<svg:path d="..." />`,
  host: {
    "[attr.width]": "width()",
    "[attr.height]": "height()",
    "[attr.viewBox]": "viewBox()",
    "[attr.fill]": "fill()",
  },
})
export class SearchIconComponent {
  readonly width = input<string>("800px");
  // ...
}
```

**Usage in template:**

```html
<svg search-icon class="stroke-2 stroke-gray-500 size-6" />
```

---

## 12. Identified Anti-Patterns and Recommendations

### ⚠️ Dependency Injection Inconsistency

**Problem**: Some components mix `inject()` and constructor injection.

```typescript
// ❌ Inconsistent — avoid
export class NavbarComponent {
  readonly authService = inject(AuthService); // inject()
  constructor(private readonly _router: Router) {} // constructor
}
```

**Solution**: Standardize to `inject()` across the entire project.

```typescript
// ✅ Consistent
export class NavbarComponent {
  readonly authService = inject(AuthService);
  private readonly _router = inject(Router);
}
```

### ⚠️ WritableSignal as Input

**Problem**: `NavbarSearchInputComponent` receives a `WritableSignal<boolean>` as input, causing double invocation `searching()()` and direct mutation of the parent's state.

```typescript
// ❌ Anti-pattern
readonly searching = input.required<WritableSignal<boolean>>();
// Template: searching()() — double invocation
// Template: (click)="searching().set(false)" — parent mutation
```

**Solution**: Use `model()` for idiomatic two-way binding.

```typescript
// ✅ Correct
readonly searching = model.required<boolean>();
// Template: searching() — normal read
// Template: [(searching)]="searching" — two-way binding
```

### ⚠️ Manual `.subscribe()` in Stores

**Problem**: In `ServiceStore`, `.subscribe()` is used directly on HTTP calls within `withMethods`, which can cause memory leaks or race conditions.

**Solution**: Use `rxMethod` from `@ngrx/signals/rxjs-interop` with `switchMap` for concurrency control.

### ⚠️ Guards Not Implemented

**Problem**: `AccountGuard` is commented out in routes. Protected routes (`manager`, `settings`) have no active client-side protection.

**Solution**: Implement a functional `canActivate` guard based on `AuthService.isLogged()`.
