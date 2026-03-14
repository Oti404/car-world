---
description: Cum să actualizezi aplicația online după ce faci modificări
---

Pentru a vedea modificările tale pe site-ul live, urmează acești pași:

1. **Salvează fișierele** în VS Code.
2. **Construiește aplicația**:
   ```cmd
   npm run build
   ```
   *Această comandă transformă codul tău Angular în fișiere optimizate pe care browser-ul le poate citi.*

3. **Încarcă pe server**:
   ```cmd
   firebase.cmd deploy
   ```
   *Această comandă urcă noile fișiere din folderul `dist` direct pe serverele Firebase.*

Aplicația ta se va actualiza instantaneu pentru toți utilizatorii!
