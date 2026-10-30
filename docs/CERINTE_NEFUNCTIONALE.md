# Cerințe Nefuncționale (Non-Functional Requirements)

Acest document descrie atributele de calitate, constrângerile tehnice și standardele de performanță pentru Platforma Web de Vânzări și Configurare Porsche.

## 1. Securitate (Security)
* **Autentificare și Autorizare:** Autentificarea utilizatorilor se va realiza exclusiv pe bază de token-uri (JWT - JSON Web Tokens), transmise prin headere HTTP securizate. Toate rutele de backend destinate Administratorului vor fi protejate prin middleware-uri de validare a rolului.
* **Criptarea Datelor:** Parolele utilizatorilor vor fi stocate în baza de date PostgreSQL folosind un algoritm de hashing puternic (ex. bcrypt), fiind strict interzisă stocarea lor în format *plain-text*.
* **Securitatea Conexiunii:** Conexiunea între aplicația de backend (Node.js) și baza de date cloud va fi securizată obligatoriu prin protocol SSL/TLS.

## 2. Performanță (Performance)
* **Timp de Răspuns:** Timpul de încărcare și procesare a opțiunilor în modulul *Configurator Auto* nu trebuie să depășească 2 secunde, pentru a asigura o experiență de utilizare fluidă.
* **Optimizarea Interogărilor:** Interogările complexe către baza de date vor fi optimizate prin Prisma ORM, utilizând indecși pe coloanele frecvent accesate (ex. VIN, statusul comenzii, adresa de email a utilizatorului).

## 3. Usabilitate (Usability)
* **Design Responsiv:** Interfața dezvoltată în Angular va fi complet *responsive*, adaptându-se dinamic pentru o afișare optimă pe ecrane de tip desktop, tabletă și dispozitive mobile.
* **Validare în Timp Real:** Erorile de completare a formularelor (ex. *Register*, *Checkout*, *Contact*) vor fi validate și afișate utilizatorului în timp real, direct pe interfață, fără a necesita reîncărcarea paginii.

## 4. Mentenabilitate și Arhitectură (Maintainability)
* **Arhitectură Stratificată:** Aplicația va respecta strict arhitectura stratificată, decuplând clar straturile de *Presentation* (Angular), *Business Logic* (Node.js/Express) și *Data Access* (Prisma ORM).
* **Componente Standalone:** Arhitectura de frontend va utiliza exclusiv componente Angular *standalone* (fără a depinde de `NgModules`), facilitând testarea izolată și reutilizarea codului.

## 5. Disponibilitate și Deployment (Availability & Deployment)
* **Infrastructură Cloud:** Baza de date relațională (PostgreSQL) va fi găzduită pe platforma cloud Supabase, asigurând disponibilitate ridicată și posibilitatea accesării sistemului din afara unui mediu local.
