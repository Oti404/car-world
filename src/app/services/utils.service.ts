import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../data-type/data-type';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private readonly router = inject(Router);

  /**
   * Facilitates centralized navigation based on the application's route configuration.
   */
  public navigateTo(route: AppRoutes): Promise<boolean> {
    return this.router.navigate([`/${route}`]);
  }
}
