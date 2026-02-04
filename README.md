🏎️ Car World — Advanced Automotive Digital Showroom
🚀 Live Demo
Vizualizează aplicația aici : https://oti404.github.io/car-world

📌 Vision & Purpose
Car World este o platformă digitală de înaltă performanță, concepută pentru a simula experiența unui showroom auto de lux. Proiectul a fost dezvoltat pentru a demonstra stăpânirea ecosistemului Angular 18, axându-se pe trei piloni fundamentali: Performanță (LCP/CLS), Reactivitate și Arhitectură Scalabilă.

🖼️ Interface Showcase

Home Page,Vehicle Catalog,Detailed Card

main-page-000.png, cart-page-000.png, car-page-000.png

Mobile Experience (Responsive Design)

Home Mobile,Catalog Mobile,Card Mobile

main-page-001.png, cart-page-001.png, car-page-001.png

🏗️ Deep Dive: Arhitectură Tehnică
1. State Management & Data Flow
Aplicația utilizează un model hibrid de gestionare a stării, combinând puterea RxJS cu simplitatea Signals:

Reactive Cart Service: Datele coșului de cumpărături sunt emise printr-un BehaviorSubject, asigurând o singură sursă de adevăr (Single Source of Truth).

Signal Interop: În NavBar, folosim toSignal() pentru a converti fluxul asincron într-o stare reactivă.

Strict Typing: Entități (Car, News, Review) definite prin Interfețe TypeScript și DTO-uri.

2. UI/UX & Responsive Engineering
Adaptive Navigation: Switch inteligent între meniu orizontal (Desktop) și sertar vertical (Mobile).

Micro-Animații: Utilizarea cubic-bezier pentru animațiile badge-urilor și keyframes pentru fade-in-ul imaginilor.

Branding: Header personalizat cu semnătură digitală discretă pentru parteneriatul cu MHP.

3. Performance Optimization
WebP Format: Conversie PNG -> WebP, reducând greutatea paginii cu ~85%.

Zero Layout Shift: Implementare aspect-ratio pentru a elimina Cumulative Layout Shift (CLS).

Lazy Loading: Resursele sunt încărcate doar la intrarea în viewport.

📂 Structura Proiectului
src/
├── app/
│   ├── components/       # Componente reutilizabile (Nav, Card, Item)
│   ├── pages/            # View-uri principale (Home, News, Cart, Reviews)
│   ├── services/         # Logica de business (Cart, Data Fetching)
│   └── data-type/        # Modele de date și Interfețe
├── assets/               # Imagini optimizate WebP și Icons
├── resources/            # Cataloagele de date (mock-backend)
└── styles.css            # Variabile globale și reset-uri CSS


🛠️ Stack-ul de Dezvoltare
Core: Angular 18 (Standalone Components API)

Logic: TypeScript 5.x, RxJS 7

Style: CSS3 Modern (BEM Methodology, CSS Variables)

CI/CD: GitHub Pages Deployment

Icons: FontAwesome 6


🚀 Instalare și Configurare
# Clone & Install
git clone https://github.com/Oti404/car-world.git
cd car-world
npm install

# Development Server
ng serve


📈 Plan de Dezvoltare Viitor (Roadmap)

[ ] Implementarea unui Backend real (Node.js / Java Spring Boot).

[ ] Integrarea unui sistem de plăți (Stripe).

[ ] Sistem de filtrare avansat și Autentificare (JWT).
















