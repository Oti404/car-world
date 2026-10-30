import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
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

  public selectedOrderForReview = signal<Order | null>(null);
  public isSubmittingReview = signal(false);
  public reviewFile = signal<File | null>(null);
  public existingReviews = signal<Map<string, CarReview>>(new Map());

  public reviewModel: Partial<CarReview> = { rating: 0, comment: '' };

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.loadUserOrders(user.uid);
      } else {
        this.isLoading = false;
      }
    });
  }

  public loadUserOrders(uid: string) {
    this.isLoading = true;
    this.orderService.getUserOrders(uid).subscribe(orders => {
      this.myOrders = orders.sort((a, b) => {
        const dateA = a.orderDate ? new Date(a.orderDate).getTime() : 0;
        const dateB = b.orderDate ? new Date(b.orderDate).getTime() : 0;
        return dateB - dateA;
      });
      this.isLoading = false;

      // Pre-fetch existing reviews for delivered orders
      orders
        .filter(o => o.status === 'DELIVERED' && o.car?.id)
        .forEach(o => {
          this.reviewService.getCarReviews(o.car!.id!).subscribe(reviews => {
            const mine = reviews.find(r => r.userId === uid);
            if (mine) {
              const map = new Map(this.existingReviews());
              map.set(o.car!.id!, mine);
              this.existingReviews.set(map);
            }
          });
        });
    });
  }

  public getOdometer(order: Order): string {
    if (!order.id) return '0';
    const seed = order.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return ((seed % 50) * 100 + 42).toLocaleString();
  }

  public openReviewForm(order: Order) {
    this.selectedOrderForReview.set(order);
    const existing = this.existingReviews().get(order.car?.id ?? '');
    this.reviewModel = existing ? { ...existing } : { rating: 5, comment: '' };
  }

  public closeReviewForm() {
    this.selectedOrderForReview.set(null);
    this.reviewFile.set(null);
  }

  public onReviewFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) this.reviewFile.set(file);
  }

  public hasReview(carId: string): boolean {
    return this.existingReviews().has(carId);
  }

  async submitReview() {
    const order = this.selectedOrderForReview();
    const user = this.authService.getCurrentUser();
    if (!order || !user || !order.car?.id) return;

    try {
      this.isSubmittingReview.set(true);

      let photoUrl = '';
      if (this.reviewFile()) {
        photoUrl = await this.storageService.uploadNewsImage(this.reviewFile()!);
      }

      const review: Partial<CarReview> = {
        carId: order.car.id,
        userId: user.uid,
        userName: user.displayName || user.email || 'Anonymous Owner',
        rating: this.reviewModel.rating!,
        comment: this.reviewModel.comment || '',
        photo: photoUrl,
        status: 'PENDING'
      };

      await firstValueFrom(this.reviewService.saveReview(review));
      this.closeReviewForm();
      this.loadUserOrders(user.uid);
    } catch (e) {
      console.error(e);
    } finally {
      this.isSubmittingReview.set(false);
    }
  }

  public handleImageError(event: any, fallback: string = 'assets/placeholder-car.jpg') {
    event.target.src = fallback;
  }
}
