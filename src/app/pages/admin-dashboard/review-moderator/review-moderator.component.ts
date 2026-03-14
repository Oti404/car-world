import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService, CarReview } from '../../../services/review.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-review-moderator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="moderator-card">
      <div class="card-header">
        <h3><i class="fas fa-gavel"></i> Review Moderation</h3>
        <span class="pending-count" *ngIf="(pendingReviews$ | async)?.length as count">
          {{ count }} Pending
        </span>
      </div>

      <div class="moderation-list_container">
        <div class="no-pending" *ngIf="(pendingReviews$ | async)?.length === 0">
          <i class="fas fa-check-circle"></i>
          <p>All reviews have been moderated.</p>
        </div>

        <div class="review-item" *ngFor="let review of pendingReviews$ | async">
          <div class="review-info">
            <div class="user-meta">
              <strong>{{ review.userName }}</strong>
            </div>
            <div class="rating">
               <i class="fas fa-star" *ngFor="let s of [1,2,3,4,5]" [class.active]="review.rating >= s"></i>
            </div>
            <p class="content">"{{ review.content }}"</p>
            
            <div class="review-media" *ngIf="review.ownerPhoto">
              <img [src]="review.ownerPhoto" alt="Owner photo" class="preview-img">
            </div>
          </div>

          <div class="moderation-actions">
            <button class="btn-approve" (click)="moderate(review.id!, 'approved')">
              <i class="fas fa-check"></i> Approve
            </button>
            <button class="btn-reject" (click)="moderate(review.id!, 'rejected')">
              <i class="fas fa-times"></i> Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .moderator-card {
      background: var(--card-bg);
      border-radius: 15px;
      padding: 2rem;
      box-shadow: var(--card-shadow);
      border: 1px solid var(--border-primary);
      margin-bottom: 2rem;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .pending-count {
      background: var(--primary-accent);
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 700;
    }
    .no-pending {
      text-align: center;
      padding: 3rem;
      color: #27ae60;
    }
    .no-pending i { font-size: 3rem; margin-bottom: 1rem; }
    
    .review-item {
      background: var(--bg-secondary);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 1.5rem;
      border: 1px solid var(--border-primary);
      display: flex;
      justify-content: space-between;
      gap: 20px;
    }
    .review-info { flex: 1; }
    .user-meta { display: flex; flex-direction: column; margin-bottom: 10px; }
    .user-meta strong { color: var(--text-primary); }
    .user-meta small { color: var(--text-muted); font-size: 0.75rem; }
    
    .rating { color: #f1c40f; margin-bottom: 10px; font-size: 0.9rem; }
    .rating i { opacity: 0.3; }
    .rating i.active { opacity: 1; }
    
    .content { 
      font-style: italic; 
      color: var(--text-secondary); 
      font-size: 0.95rem; 
      line-height: 1.5;
      margin-bottom: 15px;
    }
    
    .preview-img {
      width: 100px;
      height: 60px;
      object-fit: cover;
      border-radius: 6px;
      border: 1px solid var(--border-primary);
    }
    
    .moderation-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
      justify-content: center;
    }
    
    .btn-approve, .btn-reject {
      padding: 10px 16px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s;
    }
    
    .btn-approve { background: #27ae60; color: white; }
    .btn-approve:hover { background: #219150; }
    
    .btn-reject { background: #e74c3c; color: white; }
    .btn-reject:hover { background: #c0392b; }
    
    @media (max-width: 768px) {
      .review-item { flex-direction: column; }
      .moderation-actions { flex-direction: row; }
    }
  `]
})
export class ReviewModeratorComponent {
  private reviewService = inject(ReviewService);
  public pendingReviews$ = this.reviewService.getAllPendingReviews();

  async moderate(id: string, status: 'approved' | 'rejected') {
    try {
      await this.reviewService.updateReviewStatus(id, status);
    } catch (e) {
      console.error('Moderation error:', e);
    }
  }
}
