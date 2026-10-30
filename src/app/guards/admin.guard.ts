import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { combineLatest, filter, map, take } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return combineLatest([authService.user$, authService.dbUser$]).pipe(
    // Wait until auth is fully resolved:
    // - user is null (not logged in), OR
    // - user exists AND dbUser is loaded from PostgreSQL
    filter(([user, dbUser]) => !user || dbUser !== null),
    take(1),
    map(([user, dbUser]) => {
      if (dbUser?.role === 'ADMIN') return true;
      return router.createUrlTree(['/']);
    })
  );
};
