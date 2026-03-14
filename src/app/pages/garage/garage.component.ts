import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrderService, Order } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { ReviewService, CarReview } from '../../services/review.service';
import { StorageService } from '../../services/storage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.css'
})
export class GarageComponent implements OnInit {
  private readonly orderService = inject(OrderService);
  public readonly authService = inject(AuthService);
  public readonly reviewService = inject(ReviewService);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);

  public myOrders: Order[] = [];
  public isLoading = true;

  // Review State
  public selectedOrderForReview = signal<Order | null>(null);
  public isSubmittingReview = signal(false);
  public reviewFile = signal<File | null>(null);
  public existingReviews = signal<Map<string, CarReview>>(new Map());

  public reviewModel: Partial<CarReview> = {
    rating: 0,
    content: ''
  };

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
      this.myOrders = orders.map(o => ({
        ...o,
        orderDate: o.orderDate && (o.orderDate as any).seconds 
          ? new Date((o.orderDate as any).seconds * 1000) 
          : o.orderDate
      })).sort((a, b) => {
        const dateA = a.orderDate instanceof Date ? a.orderDate.getTime() : 0;
        const dateB = b.orderDate instanceof Date ? b.orderDate.getTime() : 0;
        return dateB - dateA;
      });
      this.isLoading = false;
      
      // Pre-fetch reviews for the cars owned
      const carIds = this.myOrders.map(o => o.car.id!);
      carIds.forEach(id => {
        this.reviewService.getUserReview(id, user.uid).subscribe(reviews => {
          if (reviews.length > 0) {
            const currentMap = new Map(this.existingReviews());
            currentMap.set(id, reviews[0]);
            this.existingReviews.set(currentMap);
          }
        });
      });
    });
  }

  public getOdometer(order: Order): string {
    // Deterministic pseudo-random odometer based on order ID
    if (!order.id) return '0';
    const seed = order.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const baseKm = (seed % 50) * 100; // random between 0 and 5000
    return (baseKm + 42).toLocaleString();
  }

  public openReviewForm(order: Order) {
    this.selectedOrderForReview.set(order);
    const existing = this.existingReviews().get(order.car.id!);
    if (existing) {
      this.reviewModel = { ...existing };
    } else {
      this.reviewModel = {
        rating: 5,
        content: ''
      };
    }
  }

  public closeReviewForm() {
    this.selectedOrderForReview.set(null);
    this.reviewFile.set(null);
  }

  public onReviewFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.reviewFile.set(file);
    }
  }

  public hasReview(carId: string): boolean {
    return this.existingReviews().has(carId);
  }

  async submitReview() {
    const order = this.selectedOrderForReview();
    const user = this.authService.getCurrentUser();
    if (!order || !user) return;

    try {
      this.isSubmittingReview.set(true);
      
      let photoUrl = this.reviewModel.ownerPhoto;
      if (this.reviewFile()) {
        photoUrl = await this.storageService.uploadNewsImage(this.reviewFile()!); // Using uploadNewsImage for now as it's generic
      }

      const review: CarReview = {
        carId: order.car.id!,
        userId: user.uid,
        userName: user.displayName || user.email || 'Anonymous Owner',
        userEmail: user.email || '',
        rating: this.reviewModel.rating!,
        content: this.reviewModel.content!,
        ownerPhoto: photoUrl,
        originalPhoto: order.car.images?.[0] || '',
        date: new Date(),
        status: 'pending'
      };

      await this.reviewService.saveReview(review);
      this.closeReviewForm();
      this.loadUserOrders(); // Refresh to update button labels
    } catch (e) {
      console.error(e);
    } finally {
      this.isSubmittingReview.set(false);
    }
  }
}
