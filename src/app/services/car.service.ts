import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api.config';

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

@Injectable({ providedIn: 'root' })
export class CarService {
  private http = inject(HttpClient);
  private readonly url = `${API_URL}/cars`;

  private readonly favoriteCarsSignal = signal<Set<string>>(new Set());

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.url);
  }

  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.url}/${id}`);
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.url, car);
  }

  updateCar(id: string, carData: Partial<Car>): Observable<Car> {
    return this.http.put<Car>(`${this.url}/${id}`, carData);
  }

  deleteCar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  public isFavorite(carTitle: string): boolean {
    return this.favoriteCarsSignal().has(carTitle);
  }

  public toggleFavorite(carTitle: string): void {
    this.favoriteCarsSignal.update(favorites => {
      const updated = new Set(favorites);
      updated.has(carTitle) ? updated.delete(carTitle) : updated.add(carTitle);
      return updated;
    });
  }
}
