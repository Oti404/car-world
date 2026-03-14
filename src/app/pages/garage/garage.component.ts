import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrderService, Order } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.css'
})
export class GarageComponent implements OnInit {
  private readonly orderService = inject(OrderService);
  public readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public myOrders: Order[] = [];
  public isLoading = true;

  ngOnInit() {
    this.loadUserOrders();
  }

  /**
   * Loads all historical and pending orders for the logged-in user.
   */
  public loadUserOrders() {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.isLoading = false;
      return;
    }
    
    this.orderService.getUserOrders(user.uid).subscribe(orders => {
      // Sort orders by date descending
      this.myOrders = orders.sort((a, b) => {
        const dateA = a.orderDate instanceof Date ? a.orderDate.getTime() : (a.orderDate as any).toMillis();
        const dateB = b.orderDate instanceof Date ? b.orderDate.getTime() : (b.orderDate as any).toMillis();
        return dateB - dateA;
      });
      this.isLoading = false;
    });
  }
}
