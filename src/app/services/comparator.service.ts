import { Injectable, signal } from '@angular/core';
import { Car } from './car.service';

@Injectable({
  providedIn: 'root'
})
export class ComparatorService {
  // Use a signal to track selected cars for real-time UI updates
  private selectedCars = signal<Car[]>([]);
  public readonly selectedCars$ = this.selectedCars.asReadonly();

  /**
   * Toggles a car in the comparison list.
   * Limits to a maximum of 3 cars.
   */
  public toggleCar(car: Car): void {
    const current = this.selectedCars();
    const index = current.findIndex(c => c.id === car.id);

    if (index > -1) {
      // Remove if already present
      this.selectedCars.set(current.filter(c => c.id !== car.id));
    } else {
      // Add if space available (max 3)
      if (current.length < 3) {
        this.selectedCars.set([...current, car]);
      } else {
        alert("You can only compare up to 3 vehicles at a time.");
      }
    }
  }

  /**
   * Checks if a car is currently selected for comparison.
   */
  public isSelected(carId: string): boolean {
    return this.selectedCars().some(c => c.id === carId);
  }

  /**
   * Returns the count of selected cars.
   */
  public getCount(): number {
    return this.selectedCars().length;
  }

  /**
   * Resets the comparison list.
   */
  public clear(): void {
    this.selectedCars.set([]);
  }
}
