import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartService } from '../../services/cart.service';
import { map } from 'rxjs';

/**
 * NavBarComponent handles the main navigation, responsive menu state,
 * and the reactive cart counter badge.
 */
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  // Dependency Injection using the modern inject() function
  private cartService = inject(CartService);

  /**
   * REACTIONARY DATA: cartCount
   * Converts the cartItems$ Observable stream into a read-only Signal.
   * This bridges the RxJS-based service with the Signal-based UI for
   * optimal change detection performance.
   */
  public readonly cartCount = toSignal(
    this.cartService.cartItems$.pipe(
      map(items => items.length)
    ),
    { initialValue: 0 }
  );

  // UI State for the mobile hamburger menu
  public isMenuOpen = false;

  /**
   * Toggles the visibility of the mobile navigation links.
   */
  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Resets the menu state. Used when clicking a link or the cart
   * to ensure the menu closes on mobile navigation.
   */
  public closeMenu(): void {
    this.isMenuOpen = false;
  }
}
