import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  public readonly cartService = inject(CartService);
  public readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public isCheckoutInProgress = false;

  /**
   * Navigates the user to the checkout page if authenticated.
   */
  public onCheckout(): void {
    if (!this.authService.getCurrentUser()) {
      alert("Please login or register to place an order.");
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate(['/checkout']);
  }
}
