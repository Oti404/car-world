# Porturi — car-world-mhp

Interval rezervat: **10000-10099**. Toate porturile sunt publicate doar pe `127.0.0.1`.

| Port host | Serviciu | Port intern | Observații |
|---|---|---|---|
| 10000 | frontend (nginx) | 80 | `127.0.0.1:10000` |
| 10001 | backend (Express API) | 3000 | `127.0.0.1:10001` |
| 10002 | db (PostgreSQL) | 5432 | rezervat, **nepublicat**: accesibil doar ca `db:5432` pe rețeaua internă |
| 10010-10019 | servicii auxiliare | – | nefolosite |
| 10090-10099 | teste / debug | – | nefolosite |

Trafic public: Caddy (80/443) → `carworld.otnielcodes.com`
- `/api/*`, `/uploads/*` → `carworld-backend:3000`
- restul → `carworld-frontend:80`
