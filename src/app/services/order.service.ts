import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, query, where, increment } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Car } from './car.service';

export interface Order {
  id?: string;
  userId: string;
  userEmail: string;
  car: Car;
  configuredPrice: number;
  status: 'pending' | 'delivered' | 'cancelled';
  orderDate: Date;
  vin?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private firestore = inject(Firestore);
  private ordersCollection = collection(this.firestore, 'orders');

  /**
   * Place a new order into the database.
   */
  placeOrder(order: Order): Promise<any> {
    return addDoc(this.ordersCollection, order);
  }

  /**
   * Get all orders placed by a specific user (For 'My Garage').
   */
  getUserOrders(userId: string): Observable<Order[]> {
    const q = query(this.ordersCollection, where('userId', '==', userId));
    return collectionData(q, { idField: 'id' }) as Observable<Order[]>;
  }

  /**
   * Get all pending orders in the system (For Admin Dashboard).
   */
  getAllPendingOrders(): Observable<Order[]> {
    const q = query(this.ordersCollection, where('status', '==', 'pending'));
    return collectionData(q, { idField: 'id' }) as Observable<Order[]>;
  }

  /**
   * Update the status of an order and optionally attach a VIN (Admin action).
   * Also deducts stock on delivery.
   */
  async updateOrderStatus(order: Order, status: 'pending' | 'delivered' | 'cancelled', vin?: string): Promise<void> {
    if (!order.id) throw new Error("Order ID missing");
    
    // 1. Update the Order document itself
    const orderDocRef = doc(this.firestore, `orders/${order.id}`);
    const updatePayload: any = { status };
    if (vin) {
      updatePayload.vin = vin;
    }
    
    // 2. We use simple sequential updates here instead of a complex batch 
    // to reduce dependency overhead, but ideally this would be a transaction.
    await updateDoc(orderDocRef, updatePayload);

    // 3. If delivered, decrease stock on the corresponding Car
    if (status === 'delivered' && order.car && order.car.id) {
       const carDocRef = doc(this.firestore, `cars/${order.car.id}`);
       await updateDoc(carDocRef, {
         stock: increment(-1)
       });
    }
  }
}

