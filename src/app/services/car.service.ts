import { Injectable, signal, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface CarOption {
  name: string;
  price: number;
}

export interface CarOptionsCategory {
  colors: CarOption[];
  wheels: CarOption[];
  interior: CarOption[];
  extras: CarOption[];
}

export interface Car {
  id?: string;
  name: string;
  basePrice: number;
  stock: number;
  description: string;
  engineSpecs: string;
  images: string[];
  options: CarOptionsCategory;
}

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private firestore = inject(Firestore);
  private carsCollection = collection(this.firestore, 'cars');

  /**
   * Internal state management using Angular Signals for high-performance reactivity.
   */
  private readonly favoriteCarsSignal = signal<Set<string>>(new Set());

  // --- FIRESTORE CRUD OPERATIONS ---

  // Get all cars
  getCars(): Observable<Car[]> {
    return collectionData(this.carsCollection, { idField: 'id' }) as Observable<Car[]>;
  }

  // Get a specific car by ID
  getCarById(id: string): Observable<Car> {
    const carDocRef = doc(this.firestore, `cars/${id}`);
    return docData(carDocRef, { idField: 'id' }) as Observable<Car>;
  }

  // Add a new car
  addCar(car: Car): Promise<any> {
    return addDoc(this.carsCollection, car);
  }

  // Update an existing car
  updateCar(id: string, carData: Partial<Car>): Promise<void> {
    const carDocRef = doc(this.firestore, `cars/${id}`);
    return updateDoc(carDocRef, carData);
  }

  // Delete a car
  deleteCar(id: string): Promise<void> {
    const carDocRef = doc(this.firestore, `cars/${id}`);
    return deleteDoc(carDocRef);
  }

  // --- EXISTING SIGNAL LOGIC ---

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
