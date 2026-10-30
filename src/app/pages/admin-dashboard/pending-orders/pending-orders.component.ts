import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { OrderService, Order } from '../../../services/order.service';

@Component({
  selector: 'app-pending-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pending-orders.component.html',
  styleUrl: './pending-orders.component.css'
})
export class PendingOrdersComponent implements OnInit {
  private orderService = inject(OrderService);

  public pendingOrders: Order[] = [];
  public isLoading = true;
  
  // Track VIN inputs per order ID
  public orderVins: { [orderId: string]: string } = {};

  ngOnInit() {
    this.loadPendingOrders();
  }

  loadPendingOrders() {
    this.orderService.getAllPendingOrders().subscribe(orders => {
      this.pendingOrders = orders;
      this.isLoading = false;
    });
  }

  async approveOrder(order: Order) {
    if (!order.id) return;
    
    const vin = this.orderVins[order.id];
    if (!vin || vin.trim().length < 5) {
      alert("Please provide a valid VIN (min 5 characters) before approving.");
      return;
    }

    try {
      await firstValueFrom(this.orderService.updateOrderStatus(order.id!, 'DELIVERED', vin));
      alert(`Order approved! Vehicle VIN: ${vin} has been registered.`);
      this.loadPendingOrders();
    } catch (err) {
      console.error("Error approving order:", err);
      alert("Failed to approve order.");
    }
  }

  async rejectOrder(order: Order) {
    if (!order.id) return;
    
    if(confirm("Are you sure you want to reject and cancel this order?")) {
      try {
        await firstValueFrom(this.orderService.updateOrderStatus(order.id!, 'CANCELLED'));
        alert("Order has been cancelled.");
        this.loadPendingOrders();
      } catch (err) {
        console.error("Error cancelling order:", err);
      }
    }
  }
}
