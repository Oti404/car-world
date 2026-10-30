import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { Car } from './car.service';
import { OrderService } from './order.service';
import { AuthService } from './auth.service';

export interface CartItem extends Car {
  configuredPrice: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);

  public cartItems: CartItem[] = [];
  private readonly cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public readonly cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  public addToCart(carItem: CartItem): void {
    const isDuplicate = this.cartItems.some(item => item.name === carItem.name);
    if (!isDuplicate) {
      this.cartItems.push(carItem);
      this.cartItemsSubject.next([...this.cartItems]);
    }
  }

  public removeFromCart(carToRemove: CartItem): void {
    this.cartItems = this.cartItems.filter(item => item.name !== carToRemove.name);
    this.cartItemsSubject.next([...this.cartItems]);
  }

  public clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next([]);
  }

  public get totalPrice(): number {
    return this.cartItems.reduce((total, car) => total + car.configuredPrice, 0);
  }

  public get itemCount(): number {
    return this.cartItems.length;
  }

  public async checkout(billingDetails: any): Promise<void> {
    if (this.cartItems.length === 0) return;

    const user = this.authService.getCurrentUser();
    if (!user) throw new Error('User must be logged in to checkout.');

    const orderPromises = this.cartItems.map(item =>
      firstValueFrom(this.orderService.placeOrder({
        userId: user.uid,
        carId: item.id,
        totalAmount: item.configuredPrice,
        status: 'PENDING',
        billingDetails
      }))
    );

    await Promise.all(orderPromises);
    this.clearCart();
  }
}
