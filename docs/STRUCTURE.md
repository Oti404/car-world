src/
└── app/
    ├── components/         <-- (UI Reutilizabil - exact ce ai în poză)
    │   ├── button/
    │   ├── car-item/
    │   ├── card/
    │   ├── checkbox/
    │   ├── footer/
    │   ├── header/
    │   └── nav-bar/
    │
    ├── data-type/          <-- (Aici vom pune interfețele TypeScript: ex. user.ts, car.ts)
    │
    ├── guards/             <-- (Exact ce ai în poză)
    │   ├── admin.guard.ts  <-- Protejează rutele de admin
    │   └── auth.guard.ts   <-- Protejează rutele unde trebuie să fii logat (ex. Checkout)
    │
    ├── services/           <-- (Asta trebuie adăugată pentru a face request-uri către Node.js)
    │   ├── auth.service.ts
    │   ├── car.service.ts
    │   ├── cart.service.ts
    │   └── order.service.ts
    │
    ├── pages/              <-- (Ecranele aplicației - exact folderele tale + cele lipsă pentru ISS)
    │   ├── admin-dashboard/
    │   ├── add-car/        <-- (NOU: Pentru UC-3, interfața de adăugare mașină pt Admin)
    │   │   ├── add-car.ts
    │   │   ├── add-car.html
    │   │   └── add-car.css
    │   ├── car-details/
    │   ├── cars/           <-- (Sau catalog, dacă le-ai separat)
    │   ├── cart/
    │   ├── catalog/
    │   ├── checkout/
    │   ├── comparator/
    │   ├── contact/
    │   ├── favorites/
    │   ├── garage/
    │   ├── home/
    │   ├── login/          <-- (NOU: Pentru UC-5)
    │   │   ├── login.ts
    │   │   ├── login.html
    │   │   └── login.css
    │   └── register/       <-- (NOU: Pentru UC-4)
    │       ├── register.ts
    │       ├── register.html
    │       └── register.css
    │
    ├── app.routes.ts       <-- Rutarea aplicației
    ├── app.component.ts
    ├── app.component.html
    └── app.config.ts