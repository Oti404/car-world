# Angular Workshop - Student Reference Guide

## 📚 Introduction

This project is a hands-on learning application designed to teach the fundamentals of Angular framework. It demonstrates core concepts including component architecture, routing, data binding, services, and component communication patterns. This README serves as a comprehensive reference guide for students to review after the workshop.

**What you'll learn:**
- How to create and structure Angular applications
- Core Angular concepts and best practices
- Component-based architecture
- Routing and navigation
- Data binding and event handling
- Services and dependency injection

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)

### Creating a New Angular Application

Follow these steps to create a new Angular project from scratch:

#### 1. Install Angular CLI globally
```bash
npm install -g @angular/cli
```

#### 2. Create a new Angular project
```bash
ng new my-angular-app
```

During setup, you'll be asked:
- **Which stylesheet format would you like to use?** → CSS (or your preference)

#### 3. Navigate to your project
```bash
cd my-angular-app
```

#### 4. Start the development server
```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The app will automatically reload when you make changes.


## 🧩 Core Angular Concepts

### 1. **Components**

Components are the fundamental building blocks of Angular applications. Each component consists of:
- **TypeScript Class** (`.ts`) - Contains logic and data
- **HTML Template** (`.html`) - Defines the view
- **CSS Styles** (`.css`) - Defines component-specific styling
- **Metadata** - Decorator that provides configuration

#### Creating a Component
```bash
ng generate component my-component
# or shorthand:
ng g c my-component
```

#### Component Structure
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',    // How to use: <app-my-component></app-my-component>
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponent {
  // Component properties
  title = 'Hello Angular';
  count = 0;
  
  // Component methods
  increment() {
    this.count++;
  }
}
```

#### Component Types
- **Smart (Container) Components**: Manage state and business logic
- **Dumb (Presentational) Components**: Display data and emit events

---

### 2. **Templates**

Templates define the component's view using HTML enhanced with Angular-specific syntax.

#### Template Syntax Examples

**Interpolation** - Display component data:
```html
<h1>{{ title }}</h1>
<p>Count: {{ count }}</p>
```

**Property Binding** - Bind element properties:
```html
<img [src]="imageUrl" [alt]="imageDescription">
<button [disabled]="isDisabled">Click Me</button>
```

**Event Binding** - Handle user events:
```html
<button (click)="increment()">Increment</button>
<input (input)="onInputChange($event)">
```

**Two-Way Binding** - Combine property and event binding:
```html
<input [(ngModel)]="username">
<p>Hello, {{ username }}!</p>
```
*Note: Requires `FormsModule` import*

---

### 3. **Data Binding**

Data binding connects the component class to the template.

| Type | Syntax | Direction | Example |
|------|--------|-----------|---------|
| **Interpolation** | `{{ }}` | Component → View | `{{ title }}` |
| **Property Binding** | `[property]` | Component → View | `[src]="url"` |
| **Event Binding** | `(event)` | View → Component | `(click)="save()"` |
| **Two-Way Binding** | `[(ngModel)]` | Both directions | `[(ngModel)]="name"` |

#### Example: Complete Data Binding
```typescript
// Component
export class UserComponent {
  username = 'John';
  isActive = true;
  
  onSubmit() {
    console.log('Submitted:', this.username);
  }
}
```

```html
<!-- Template -->
<div>
  <p>Welcome, {{ username }}!</p>
  <input [(ngModel)]="username" [disabled]="!isActive">
  <button (click)="onSubmit()">Submit</button>
</div>
```

---

### 4. **Directives & Control Flow**

Directives are instructions in the DOM that tell Angular how to transform or manipulate elements.

#### Control Flow Syntax (Angular 17+) ✨ NEW

Angular 17 introduced a new built-in control flow syntax that's more intuitive and performant.

**`@if`** - Conditionally render elements:
```html
<!-- Basic @if -->
@if (isLoggedIn) {
  <p>Welcome back!</p>
}

<!-- @if with @else -->
@if (isAdmin) {
  <div>Admin Panel</div>
} @else {
  <div>Access Denied</div>
}

<!-- @if with @else if -->
@if (role === 'admin') {
  <p>Admin Dashboard</p>
} @else if (role === 'user') {
  <p>User Dashboard</p>
} @else {
  <p>Guest View</p>
}
```

**`@for`** - Loop through arrays:
```html
<!-- Basic @for -->
<ul>
  @for (item of items; track item.id) {
    <li>{{ item.name }}</li>
  }
</ul>

<!-- @for with index -->
<ul>
  @for (item of items; track item.id; let i = $index) {
    <li>{{ i + 1 }}. {{ item.name }}</li>
  }
</ul>

<!-- @for with @empty -->
<ul>
  @for (item of items; track item.id) {
    <li>{{ item.name }}</li>
  } @empty {
    <li>No items available</li>
  }
</ul>
```

**Note:** The `track` expression is required for `@for` and helps Angular optimize rendering.

**`@switch`** - Multiple conditional rendering:
```html
@switch (userRole) {
  @case ('admin') {
    <p>Admin Dashboard</p>
  }
  @case ('user') {
    <p>User Dashboard</p>
  }
  @default {
    <p>Guest View</p>
  }
}
```

#### Legacy Structural Directives (Still Supported)

The old syntax with `*ngIf`, `*ngFor`, and `*ngSwitch` still works but the new control flow is recommended:

```html
<!-- Old syntax (still valid) -->
<p *ngIf="isLoggedIn">Welcome back!</p>

<ul>
  <li *ngFor="let item of items; let i = index">
    {{ i + 1 }}. {{ item.name }}
  </li>
</ul>

<div [ngSwitch]="userRole">
  <p *ngSwitchCase="'admin'">Admin Dashboard</p>
  <p *ngSwitchCase="'user'">User Dashboard</p>
  <p *ngSwitchDefault>Guest View</p>
</div>
```

#### Attribute Directives (Change appearance or behavior)

Attribute directives modify the appearance or behavior of DOM elements without changing the structure.

##### **Class Binding**

**Simple `[class]` binding** - Best for single class toggle:
```html
<!-- Toggle single class -->
<div [class.active]="isActive">Content</div>

<!-- Bind entire class attribute -->
<div [class]="dynamicClasses">Content</div>
```

```typescript
// Component
export class MyComponent {
  isActive = true;
  dynamicClasses = 'btn btn-primary';
}
```

**`[ngClass]`** - Best for multiple conditional classes:
```html
<!-- Multiple classes with conditions -->
<div [ngClass]="{
  'active': isActive,
  'disabled': !isEnabled,
  'highlighted': score > 80
}">Content</div>

<!-- Using array -->
<div [ngClass]="['btn', 'btn-primary', isLarge ? 'btn-lg' : 'btn-sm']">Button</div>

<!-- Using string expression -->
<div [ngClass]="getClassNames()">Content</div>
```

```typescript
// Component
export class MyComponent {
  isActive = true;
  isEnabled = false;
  score = 95;
  isLarge = true;
  
  getClassNames(): string {
    return this.isActive ? 'active theme-dark' : 'inactive theme-light';
  }
}
```

**When to use `[class]` vs `[ngClass]`:**

| Use Case | Recommended Approach | Example |
|----------|---------------------|---------|
| Toggle single class | `[class.className]` | `[class.active]="isActive"` |
| Set entire class string | `[class]` | `[class]="'btn btn-primary'"` |
| Multiple conditional classes | `[ngClass]` | `[ngClass]="{'active': isActive, 'disabled': isDisabled}"` |
| Dynamic class computation | `[ngClass]` with method | `[ngClass]="getClasses()"` |

##### **Style Binding**

**Simple `[style]` binding** - Best for single style property:
```html
<!-- Single style property -->
<p [style.color]="textColor">Colored Text</p>
<p [style.font-size.px]="fontSize">Sized Text</p>
<p [style.background-color]="bgColor">Background</p>

<!-- With units -->
<div [style.width.%]="widthPercentage">Width</div>
<div [style.margin.rem]="marginSize">Margin</div>

<!-- Bind entire style attribute -->
<div [style]="dynamicStyles">Content</div>
```

```typescript
// Component
export class MyComponent {
  textColor = 'blue';
  fontSize = 16;
  bgColor = '#f0f0f0';
  widthPercentage = 50;
  marginSize = 2;
  dynamicStyles = 'color: red; font-weight: bold;';
}
```

**`[ngStyle]`** - Best for multiple conditional styles:
```html
<!-- Multiple styles with conditions -->
<p [ngStyle]="{
  'color': isError ? 'red' : 'green',
  'font-size': fontSize + 'px',
  'font-weight': isBold ? 'bold' : 'normal',
  'text-decoration': isUnderlined ? 'underline' : 'none'
}">Styled Text</p>

<!-- Using method -->
<div [ngStyle]="getStyles()">Content</div>
```

```typescript
// Component
export class MyComponent {
  isError = true;
  fontSize = 18;
  isBold = true;
  isUnderlined = false;
  
  getStyles(): any {
    return {
      'color': this.isError ? 'red' : 'green',
      'background-color': this.isError ? '#ffe6e6' : '#e6ffe6',
      'padding': '10px',
      'border-radius': '4px'
    };
  }
}
```

**When to use `[style]` vs `[ngStyle]`:**

| Use Case | Recommended Approach | Example |
|----------|---------------------|---------|
| Single style property | `[style.property]` | `[style.color]="textColor"` |
| Style with unit | `[style.property.unit]` | `[style.width.px]="200"` |
| Multiple conditional styles | `[ngStyle]` | `[ngStyle]="{'color': color, 'font-size': size}"` |
| Dynamic style computation | `[ngStyle]` with method | `[ngStyle]="getStyles()"` |
| Static style string | `[style]` | `[style]="'color: red; margin: 10px;'"` |

##### **Best Practices**

✅ **Prefer CSS classes over inline styles** when possible:
```html
<!-- Good: Use CSS classes -->
<div [class.error]="hasError">Error Message</div>

<!-- Avoid: Inline styles for static styling -->
<div [style.color]="'red'">Error Message</div>
```

✅ **Use simple bindings for single properties:**
```html
<!-- Good: Simple and readable -->
<div [class.active]="isActive" [style.color]="textColor">Content</div>

<!-- Overkill: NgClass/NgStyle for single property -->
<div [ngClass]="{'active': isActive}" [ngStyle]="{'color': textColor}">Content</div>
```

✅ **Use `ngClass`/`ngStyle` for complex conditions:**
```html
<!-- Good: Multiple conditions -->
<div [ngClass]="{
  'primary': type === 'primary',
  'secondary': type === 'secondary',
  'large': size === 'lg',
  'disabled': !isEnabled
}">Button</div>
```

---

### 5. **Services & Dependency Injection**

Services are singleton classes that provide shared functionality across components.

#### Creating a Service
```bash
ng generate service services/data
# or shorthand:
ng g s services/data
```

#### Service Example
```typescript
// data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Makes service available app-wide
})
export class DataService {
  private items: string[] = [];
  
  getItems(): string[] {
    return this.items;
  }
  
  addItem(item: string): void {
    this.items.push(item);
  }
}
```

#### Using a Service in a Component

**Modern Approach with `inject()` ✨ (Recommended - Angular 14+):**

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-my-component',
  standalone: true,
  templateUrl: './my-component.component.html'
})
export class MyComponent implements OnInit {
  // Modern dependency injection using inject()
  private dataService = inject(DataService);
  
  items: string[] = [];
  
  ngOnInit(): void {
    this.items = this.dataService.getItems();
  }
  
  addNewItem(item: string): void {
    this.dataService.addItem(item);
  }
}
```

**Benefits of `inject()`:**
- Cleaner syntax - no constructor needed
- Can be used anywhere in the class (not just constructor)
- Works well with functional programming patterns
- Easier to test and mock

**Legacy Constructor Injection (Still Supported):**

```typescript
import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html'
})
export class MyComponent implements OnInit {
  items: string[] = [];
  
  // Traditional constructor-based dependency injection
  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
    this.items = this.dataService.getItems();
  }
  
  addNewItem(item: string): void {
    this.dataService.addItem(item);
  }
}
```

**When to use `inject()` vs constructor injection:**

| Feature | `inject()` | Constructor Injection |
|---------|-----------|----------------------|
| **Syntax** | `service = inject(Service)` | `constructor(private service: Service)` |
| **Where to use** | Anywhere in class initialization | Only in constructor |
| **Standalone components** | ✅ Recommended | ✅ Works |
| **Functional patterns** | ✅ Great | ❌ Limited |
| **Learning curve** | Easier | Traditional |

**Recommendation:** Use `inject()` for new projects and when learning Angular - it's simpler and more modern.

**Why Use Services?**
- Share data between components
- Centralize business logic
- Handle HTTP requests
- Maintain application state
- Improve code reusability and testability

---

### 6. **Routing**

Angular Router enables navigation between different views/components.

#### Setting Up Routes

**1. Define routes** (`app.routes.ts`):
```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Default route
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user/:id', component: UserDetailComponent },  // Route with parameter
  { path: '**', component: NotFoundComponent }           // Wildcard for 404
];
```

**2. Add router outlet** (in `app.component.html`):
```html
<nav>
  <a routerLink="/home" routerLinkActive="active">Home</a>
  <a routerLink="/about" routerLinkActive="active">About</a>
</nav>

<router-outlet></router-outlet>  <!-- Components render here -->
```

#### Navigation Methods

**In Template:**
```html
<!-- Basic navigation -->
<a routerLink="/about">About</a>

<!-- Navigation with parameters -->
<a [routerLink]="['/user', userId]">User Profile</a>

<!-- Active link styling -->
<a routerLink="/home" routerLinkActive="active-link">Home</a>
```

**Programmatic Navigation:**
```typescript
import { Router } from '@angular/router';

export class MyComponent {
  constructor(private router: Router) {}
  
  goToAbout(): void {
    this.router.navigate(['/about']);
  }
  
  goToUser(id: number): void {
    this.router.navigate(['/user', id]);
  }
}
```

#### Reading Route Parameters
```typescript
import { ActivatedRoute } from '@angular/router';

export class UserDetailComponent implements OnInit {
  userId: string = '';
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    // Get route parameter
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    
    // Or subscribe for dynamic updates
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || '';
    });
  }
}
```

---

### 7. **Signals** ✨ NEW (Angular 16+)

Signals are a reactive primitive that provide a new way to manage state and reactivity in Angular applications. They offer better performance and simpler mental models compared to RxJS for many use cases.

#### What are Signals?

Signals are containers that hold values and notify consumers when those values change. They make change detection more efficient and code more readable.

#### Creating and Using Signals

```typescript
import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <p>Count: {{ count() }}</p>
      <p>Double: {{ doubleCount() }}</p>
      <button (click)="increment()">Increment</button>
      <button (click)="reset()">Reset</button>
    </div>
  `
})
export class CounterComponent {
  // Writable signal
  count = signal(0);
  
  // Computed signal (derives from other signals)
  doubleCount = computed(() => this.count() * 2);
  
  // Effect (runs when signals change)
  constructor() {
    effect(() => {
      console.log('Count changed to:', this.count());
    });
  }
  
  increment(): void {
    // Update signal value
    this.count.update(value => value + 1);
    // Or use set for absolute values
    // this.count.set(10);
  }
  
  reset(): void {
    this.count.set(0);
  }
}
```

#### Signal Methods

**Reading a Signal:**
```typescript
const value = mySignal();  // Call it like a function
```

**Updating a Signal:**
```typescript
// Set absolute value
mySignal.set(100);

// Update based on current value
mySignal.update(current => current + 1);

// For object/array signals, mutate directly
mySignal.mutate(value => {
  value.push('new item');
});
```

#### Computed Signals

Computed signals automatically update when their dependencies change:

```typescript
firstName = signal('John');
lastName = signal('Doe');

// Automatically updates when firstName or lastName changes
fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
```

#### Effects

Effects run side effects when signals change:

```typescript
constructor() {
  // Runs whenever 'count' signal changes
  effect(() => {
    const currentCount = this.count();
    localStorage.setItem('count', currentCount.toString());
  });
}
```

#### Signals vs RxJS Observables

| Feature | Signals | RxJS Observables |
|---------|---------|------------------|
| **Use Case** | Simple state management | Complex async operations |
| **Syntax** | `value()` | `value$.pipe()` |
| **Change Detection** | Automatic, fine-grained | Zone-based or manual |
| **Learning Curve** | Easier | Steeper |
| **Best For** | Component state | HTTP, events, streams |

#### When to Use Signals

✅ **Use Signals for:**
- Component local state
- Derived/computed values
- Simple reactive updates
- Form state management
- UI state (loading, errors, etc.)

❌ **Use RxJS for:**
- HTTP requests
- Complex async operations
- Event streams
- Advanced operators (debounce, throttle, etc.)

#### Signal Inputs (Angular 17.1+)

You can now use signals for component inputs:

```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
    <div>
      <h3>{{ userName() }}</h3>
      <p>Age: {{ userAge() }}</p>
      <button (click)="handleClick()">Click Me</button>
    </div>
  `
})
export class UserCardComponent {
  // Signal-based input (read-only)
  userName = input<string>('');  // Default value
  userAge = input.required<number>();  // Required input
  
  // Signal-based output
  clicked = output<string>();
  
  handleClick(): void {
    this.clicked.emit('Button clicked!');
  }
}
```

**Usage:**
```html
<app-user-card 
  [userName]="'John Doe'" 
  [userAge]="30"
  (clicked)="onUserClick($event)">
</app-user-card>
```

#### Practical Example: Todo List with Signals

```typescript
import { Component, signal, computed } from '@angular/core';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  template: `
    <div>
      <input #todoInput (keyup.enter)="addTodo(todoInput.value); todoInput.value = ''">
      <p>Total: {{ totalCount() }} | Completed: {{ completedCount() }}</p>
      
      <ul>
        @for (todo of todos(); track todo.id) {
          <li>
            <input 
              type="checkbox" 
              [checked]="todo.completed"
              (change)="toggleTodo(todo.id)">
            {{ todo.text }}
          </li>
        }
      </ul>
    </div>
  `
})
export class TodoListComponent {
  todos = signal<Todo[]>([]);
  
  // Computed signals
  totalCount = computed(() => this.todos().length);
  completedCount = computed(() => 
    this.todos().filter(t => t.completed).length
  );
  
  addTodo(text: string): void {
    if (!text.trim()) return;
    
    this.todos.update(todos => [
      ...todos,
      { id: Date.now(), text, completed: false }
    ]);
  }
  
  toggleTodo(id: number): void {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }
}
```

**Key Takeaway:** Signals provide a simpler, more performant way to handle reactive state in Angular. They're especially powerful when combined with the new control flow syntax!

---

## 🎯 Component Communication Patterns

Angular provides several ways for components to communicate. Here we'll focus on the modern signal-based approach (Angular 17.1+), which is simpler and more intuitive for beginners.

### Parent to Child - Using Signal Inputs ✨ (Recommended)

Signal inputs provide a reactive way to pass data from parent to child components.

```typescript
// Child Component
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: `
    <div class="card">
      <h3>{{ userName() }}</h3>
      <p>Email: {{ userEmail() }}</p>
      <p>Age: {{ userAge() }}</p>
    </div>
  `
})
export class UserCardComponent {
  // Signal-based inputs (read-only in child)
  userName = input<string>('Guest');           // With default value
  userEmail = input.required<string>();        // Required input
  userAge = input<number>(0);                  // Optional with default
}
```

```typescript
// Parent Component
import { Component, signal } from '@angular/core';
import { UserCardComponent } from './user-card.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [UserCardComponent],
  template: `
    <div>
      <app-user-card 
        [userName]="currentUser().name"
        [userEmail]="currentUser().email"
        [userAge]="currentUser().age">
      </app-user-card>
    </div>
  `
})
export class ParentComponent {
  currentUser = signal({
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  });
}
```

**Benefits of Signal Inputs:**
- Automatically reactive - component updates when input changes
- Type-safe with TypeScript
- Simpler syntax than traditional `@Input()`
- Can be used in computed signals and effects

### Child to Parent - Using Signal Outputs ✨ (Recommended)

Signal outputs provide a type-safe way to emit events from child to parent.

```typescript
// Child Component
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <div>
      <button (click)="handleIncrement()">Increment</button>
      <button (click)="handleDecrement()">Decrement</button>
      <button (click)="handleReset()">Reset</button>
    </div>
  `
})
export class CounterComponent {
  // Signal-based outputs
  counterChanged = output<number>();
  resetClicked = output<void>();
  
  private count = 0;
  
  handleIncrement(): void {
    this.count++;
    this.counterChanged.emit(this.count);
  }
  
  handleDecrement(): void {
    this.count--;
    this.counterChanged.emit(this.count);
  }
  
  handleReset(): void {
    this.count = 0;
    this.resetClicked.emit();
  }
}
```

```typescript
// Parent Component
import { Component, signal } from '@angular/core';
import { CounterComponent } from './counter.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CounterComponent],
  template: `
    <div>
      <h2>Current Count: {{ totalCount() }}</h2>
      <app-counter 
        (counterChanged)="onCountChange($event)"
        (resetClicked)="onReset()">
      </app-counter>
    </div>
  `
})
export class ParentComponent {
  totalCount = signal(0);
  
  onCountChange(newCount: number): void {
    this.totalCount.set(newCount);
    console.log('Count changed to:', newCount);
  }
  
  onReset(): void {
    this.totalCount.set(0);
    console.log('Counter was reset');
  }
}
```

### Complete Example: Product Card with Signal Communication

```typescript
// Product Card Component (Child)
import { Component, input, output } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  template: `
    <div class="product-card">
      <h3>{{ product().name }}</h3>
      <p class="price">\${{ product().price }}</p>
      <p class="stock">{{ product().inStock ? 'In Stock' : 'Out of Stock' }}</p>
      
      @if (product().inStock) {
        <button (click)="handleAddToCart()" class="btn-primary">
          Add to Cart
        </button>
      }
      
      <button (click)="handleViewDetails()" class="btn-secondary">
        View Details
      </button>
    </div>
  `,
  styles: [`
    .product-card {
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 8px;
    }
    .price { font-size: 1.5rem; font-weight: bold; color: #2ecc71; }
    .stock { color: #7f8c8d; }
  `]
})
export class ProductCardComponent {
  // Inputs
  product = input.required<Product>();
  
  // Outputs
  addToCart = output<Product>();
  viewDetails = output<number>();
  
  handleAddToCart(): void {
    this.addToCart.emit(this.product());
  }
  
  handleViewDetails(): void {
    this.viewDetails.emit(this.product().id);
  }
}
```

```typescript
// Product List Component (Parent)
import { Component, signal } from '@angular/core';
import { ProductCardComponent } from './product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    <div class="product-list">
      <h2>Products</h2>
      <p>Cart Items: {{ cartCount() }}</p>
      
      @for (product of products(); track product.id) {
        <app-product-card 
          [product]="product"
          (addToCart)="onAddToCart($event)"
          (viewDetails)="onViewDetails($event)">
        </app-product-card>
      }
    </div>
  `
})
export class ProductListComponent {
  products = signal<Product[]>([
    { id: 1, name: 'Laptop', price: 999, inStock: true },
    { id: 2, name: 'Mouse', price: 29, inStock: true },
    { id: 3, name: 'Keyboard', price: 79, inStock: false }
  ]);
  
  cartCount = signal(0);
  
  onAddToCart(product: Product): void {
    this.cartCount.update(count => count + 1);
    console.log('Added to cart:', product.name);
  }
  
  onViewDetails(productId: number): void {
    console.log('View details for product ID:', productId);
    // Navigate to product details or show modal
  }
}
```

### Sibling Communication - Using Shared Service with Signals

When components don't have a parent-child relationship, use a shared service.

```typescript
// Shared Service with Signals
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  // Private writable signal
  private cartItems = signal<string[]>([]);
  
  // Public read-only computed signal
  items = computed(() => this.cartItems());
  itemCount = computed(() => this.cartItems().length);
  
  addItem(item: string): void {
    this.cartItems.update(items => [...items, item]);
  }
  
  removeItem(item: string): void {
    this.cartItems.update(items => items.filter(i => i !== item));
  }
  
  clearCart(): void {
    this.cartItems.set([]);
  }
}
```

```typescript
// Sibling Component 1 - Add Items
import { Component } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  template: `
    <div>
      <h3>Products</h3>
      <button (click)="addProduct('Laptop')">Add Laptop</button>
      <button (click)="addProduct('Mouse')">Add Mouse</button>
    </div>
  `
})
export class ProductListComponent {
  constructor(private cartService: CartService) {}
  
  addProduct(product: string): void {
    this.cartService.addItem(product);
  }
}
```

```typescript
// Sibling Component 2 - Display Cart
import { Component } from '@angular/core';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart-display',
  standalone: true,
  template: `
    <div>
      <h3>Shopping Cart ({{ cartService.itemCount() }})</h3>
      <ul>
        @for (item of cartService.items(); track item) {
          <li>{{ item }}</li>
        }
      </ul>
      <button (click)="clearCart()">Clear Cart</button>
    </div>
  `
})
export class CartDisplayComponent {
  constructor(public cartService: CartService) {}
  
  clearCart(): void {
    this.cartService.clearCart();
  }
}
```

---

### Legacy Syntax (Still Supported) 📝

For reference, here's the traditional approach using decorators:

#### Legacy Parent to Child - `@Input()`
```typescript
// Child Component (Old Way)
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: '<p>{{ message }}</p>'
})
export class ChildComponent {
  @Input() message: string = '';
}
```

```html
<!-- Parent Template -->
<app-child [message]="parentMessage"></app-child>
```

#### Legacy Child to Parent - `@Output()` and `EventEmitter`
```typescript
// Child Component (Old Way)
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: '<button (click)="sendMessage()">Send</button>'
})
export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>();
  
  sendMessage(): void {
    this.messageEvent.emit('Hello from child!');
  }
}
```

```html
<!-- Parent Template -->
<app-child (messageEvent)="receiveMessage($event)"></app-child>
```

```typescript
// Parent Component
receiveMessage(message: string): void {
  console.log(message);
}
```

#### Legacy Sibling Communication - RxJS BehaviorSubject
```typescript
// Shared Service (Old Way)
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();
  
  changeMessage(message: string): void {
    this.messageSource.next(message);
  }
}
```

**When to use legacy syntax:**
- Working with older Angular codebases (pre-17)
- Team hasn't migrated to signals yet
- Specific library requires `@Input()`/`@Output()`

**Recommendation:** For new projects and learning Angular, start with signal-based inputs/outputs. They're simpler, more intuitive, and represent Angular's future direction.

---

## 🛠️ Common Angular CLI Commands

| Command | Description |
|---------|-------------|
| `ng new app-name` | Create a new Angular application |
| `ng serve` | Start development server |
| `ng generate component name` | Create a new component |
| `ng generate service name` | Create a new service |
| `ng generate module name` | Create a new module |
| `ng build` | Build the project for production |
| `ng test` | Run unit tests |
| `ng lint` | Lint your code |

**Shorthand:**
- `ng g c component-name` - Generate component
- `ng g s service-name` - Generate service
- `ng g m module-name` - Generate module
- `ng g d directive-name` - Generate directive
- `ng g p pipe-name` - Generate pipe

---

## 📖 Best Practices for Beginners

### 1. **Project Structure**
```
src/
├── app/
│   ├── components/        # Reusable components
│   ├── services/          # Services
│   ├── models/            # TypeScript interfaces/types
│   ├── guards/            # Route guards
│   └── pipes/             # Custom pipes
├── assets/                # Images, fonts, etc.
└── environments/          # Environment configurations
```

### 2. **Naming Conventions**
- **Components**: `user-profile.component.ts` (kebab-case)
- **Services**: `data.service.ts`
- **Classes**: `UserProfile` (PascalCase)
- **Variables/Methods**: `userName`, `getUserData()` (camelCase)
- **Constants**: `MAX_RETRY_ATTEMPTS` (UPPER_SNAKE_CASE)

### 3. **Component Guidelines**
- Keep components small and focused (Single Responsibility Principle)
- Use smart/dumb component pattern
- Avoid complex logic in templates
- Unsubscribe from Observables to prevent memory leaks
- Use OnPush change detection when possible

### 4. **Service Guidelines**
- Use services for data management and business logic
- Keep services stateless when possible
- Use `providedIn: 'root'` for singleton services
- Handle errors properly in HTTP requests

### 5. **TypeScript Tips**
- Use interfaces for data models
- Enable strict mode in `tsconfig.json`
- Avoid using `any` type
- Leverage TypeScript's type safety

### 6. **Performance**
- Use `trackBy` with `*ngFor` for large lists
- Lazy load modules for better performance
- Use `async` pipe for Observables in templates
- Optimize images and assets

### 7. **Code Quality**
- Write meaningful component and variable names
- Add comments for complex logic
- Follow Angular style guide
- Use linters and formatters (ESLint, Prettier)

---

## 🔗 Useful Resources

- **Official Angular Documentation**: https://angular.io/docs
- **Angular CLI Reference**: https://angular.io/cli
- **Angular Style Guide**: https://angular.io/guide/styleguide
- **RxJS Documentation**: https://rxjs.dev/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/

---

## 🚦 Running This Project

### Development Server
```bash
ng serve
```
Navigate to `http://localhost:4200/`

### Build for Production
```bash
ng build --configuration production
```
Build artifacts will be stored in the `dist/` directory.

### Running Tests
```bash
ng test
```

---

## 💡 Key Takeaways

1. **Components** are the building blocks - everything is a component
2. **Data flows down, events flow up** - Parent-child communication pattern
3. **Services** centralize shared logic and data
4. **Routing** enables SPA (Single Page Application) navigation
5. **TypeScript** adds type safety and modern JavaScript features
6. **Angular CLI** automates common development tasks
7. **Reactive programming** with RxJS is powerful for async operations

---

## 📝 Next Steps

After completing this workshop, consider exploring:
- **Forms**: Template-driven and Reactive Forms
- **HTTP Client**: Making API calls
- **State Management**: NgRx or Akita
- **Animations**: Angular Animation API
- **Testing**: Unit testing with Jasmine/Karma
- **Progressive Web Apps (PWA)**: Making your app installable
- **Server-Side Rendering**: Angular Universal

---

## 🤝 Support

If you have questions or need help:
- Review Angular documentation
- Check Stack Overflow
- Join Angular community forums
- Practice building small projects

**Happy Coding! 🎉**
