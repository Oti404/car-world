import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api.config';
import { Car } from './car.service';

export interface Order {
  id?: string;
  userId: string;
  userEmail?: string;
  carId?: string;
  car?: Car;
  totalAmount: number;
  configuredPrice?: number;
  status: 'PENDING' | 'PAID' | 'DELIVERED' | 'CANCELLED';
  orderDate?: Date;
  assignedVin?: string;
  vin?: string;
  billingDetails?: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private readonly url = `${API_URL}/orders`;

  placeOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.url, order);
  }

  getUserOrders(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}/user/${userId}`);
  }

  getAllPendingOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}?status=PENDING`);
  }

  updateOrderStatus(orderId: string, status: Order['status'], vin?: string): Observable<Order> {
    return this.http.put<Order>(`${this.url}/${orderId}/status`, { status, assignedVin: vin });
  }
}
