# Planificarea Cazurilor de Utilizare pe Iterații
**Proiect:** Platformă E-Commerce și Configurator Auto (Porsche)
**Arhitectură:** Presentation (Angular) - Business Logic (Node.js) - Data Access (Prisma ORM / PostgreSQL)

Prezentul document detaliază planificarea celor 8 cazuri de utilizare majore pe 3 iterații de dezvoltare, conform metodologiei iterative și incrementale.

---

## Iterația 1: Fundația Sistemului și Gestiunea Identității (Core & IAM)

Prima iterație se concentrează pe construirea arhitecturii de bază (*Walking Skeleton*). Pentru ca sistemul să poată procesa comenzi ulterior, este necesară mai întâi popularea bazei de date cu produse (mașini) și implementarea modulului de securitate pentru identificarea actorilor.

**Cazuri de Utilizare implementate:**
* **UC-3: Adăugare mașină în catalog** (Modulul de Administrare Catalog)
* **UC-4: Creare cont utilizator** (Modulul de Înregistrare)
* **UC-5: Autentificare în sistem** (Modulul de Login și Gestiune Roluri)

**Justificare arhitecturală:** Implementarea acestor funcționalități validează conectivitatea întregii stive tehnologice (de la interfața Angular până la persistența în PostgreSQL prin Prisma). Gestiunea identității (IAM) este obligatorie în această fază incipientă pentru a asigura trasabilitatea acțiunilor din iterațiile viitoare (ex: asocierea unei comenzi cu un client autentificat).

---

## Iterația 2: Fluxul Principal de Business (Configurare & E-Commerce)

A doua iterație livrează valoarea principală de business a aplicației. Având catalogul de mașini disponibil și utilizatorii înregistrați, sistemul este extins pentru a permite interacțiunea directă a clienților cu produsele și finalizarea tranzacțiilor.

**Cazuri de Utilizare implementate:**
* **UC-1: Configurare mașină și adăugare în coș** (Modulul Configurator Auto)
* **UC-2: Plasare comandă auto** (Modulul de Checkout și Integrare Plăți)
* **UC-7: Trimitere formular de contact** (Modulul de Suport Clienți)


**Justificare arhitecturală:** Aceste cazuri de utilizare reprezintă nucleul comercial al aplicației. Dezvoltarea lor în etapa mediană permite testarea timpurie a logicii de business complexe (calcularea dinamică a prețurilor în funcție de opțiuni) și a tranzițiilor de stare ale actorilor (transformarea unui *Client* în *Proprietar* după asignarea unui VIN comenzii plătite).

---

## Iterația 3: Administrare, Raportare și Retenția Clienților (Back-Office & Support)

Ultima iterație adaugă maturitate produsului software, oferind unelte de administrare a datelor acumulate și mecanisme de comunicare bidirecțională între clienți și echipa de suport.

**Cazuri de Utilizare implementate:**
* **UC-6: Adăugare Review auto** (Modulul de Feedback și Recenzii)
* **UC-8: Vizualizare Dashboard și Rapoarte** (Modulul de Analiză și Raportare)

**Justificare arhitecturală:** Funcționalitățile de back-office și raportare (UC-8) depind strict de volumul de date generat de modulele din Iterațiile 1 și 2 (utilizatori, comenzi, mașini). Implementarea lor la final este logică, permițând administratorilor să gestioneze fluxul operațional, să aprobe recenziile (UC-6) și să răspundă la solicitările de contact (UC-7).
