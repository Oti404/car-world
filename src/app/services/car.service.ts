import { Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  /**
   * Internal state management using Angular Signals for high-performance reactivity.
   */
  private readonly favoriteCarsSignal = signal<Set<string>>(new Set());

  /**
   * Checks if a vehicle is currently marked as a favorite.
   */
  public isFavorite(carTitle: string): boolean {
    return this.favoriteCarsSignal().has(carTitle);
  }

  /**
   * Toggles the favorite status for a specific vehicle title.
   */
  public toggleFavorite(carTitle: string): void {
    this.favoriteCarsSignal.update(favorites => {
      const updatedFavorites = new Set(favorites);

      if (updatedFavorites.has(carTitle)) {
        updatedFavorites.delete(carTitle);
      } else {
        updatedFavorites.add(carTitle);
      }

      return updatedFavorites;
    });
  }
}
