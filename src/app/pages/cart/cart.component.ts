import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CarDto } from '../../data-type/car-data';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  public readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  public isOrderComplete = false;
  public totalTransactionAmount = 0;
  public finalizedItems: CarDto[] = [];

  /**
   * Orchestrates the checkout process.
   * Captures current cart state for the success modal before clearing the global store.
   */
  public onCheckout(): void {
    this.cartService.cartItems$.pipe(take(1)).subscribe(items => {
      if (items.length === 0) return;

      this.totalTransactionAmount = this.cartService.totalPrice;
      this.finalizedItems = [...items];

      this.cartService.clearCart();
      this.isOrderComplete = true;
    });
  }

  /**
   * Navigates the user back to the home view after a successful transaction.
   */
  public finalizeOrder(): void {
    this.isOrderComplete = false;
    this.router.navigate(['/home']);
  }

  /**
   * Extracts active configuration keys from a vehicle options object.
   */
  public getSelectedOptions(options: any): string[] {
    if (!options) return [];
    return Object.keys(options).filter(key => options[key] === true);
  }

  /**
   * Transforms technical keys into human-readable labels.
   * @example "premiumAudio" -> "Premium Audio"
   */
  public formatOptionLabel(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }
}
