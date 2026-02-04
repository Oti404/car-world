import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CarDto } from '../data-type/car-data';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems: CarDto[] = [];
  private readonly cartItemsSubject = new BehaviorSubject<CarDto[]>([]);

  /**
   * Observable stream of the current cart contents for reactive UI updates.
   */
  public readonly cartItems$: Observable<CarDto[]> = this.cartItemsSubject.asObservable();

  /**
   * Adds a vehicle to the cart.
   * Business Rule: Prevents duplicate entries based on the vehicle title.
   */
  public addToCart(car: CarDto): void {
    const isDuplicate = this.cartItems.some(item => item.title === car.title);

    if (!isDuplicate) {
      this.cartItems.push(car);
      this.cartItemsSubject.next([...this.cartItems]);
    }
  }

  public removeFromCart(carToRemove: CarDto): void {
    this.cartItems = this.cartItems.filter(item => item.title !== carToRemove.title);
    this.cartItemsSubject.next([...this.cartItems]);
  }

  public clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next([]);
  }

  public get totalPrice(): number {
    return this.cartItems.reduce((total, car) => total + car.price, 0);
  }

  public get itemCount(): number {
    return this.cartItems.length;
  }
}
