import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc, query, where, Timestamp } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface CarReview {
  id?: string;
  carId: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number;
  content: string;
  ownerPhoto?: string;
  originalPhoto?: string;
  date: any;
  status: 'pending' | 'approved' | 'rejected';
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private firestore = inject(Firestore);
  private reviewsCollection = collection(this.firestore, 'reviews');

  /**
   * Saves or updates a review. 
   */
  async saveReview(review: Omit<CarReview, 'status'> & { status?: string }): Promise<void> {
    const reviewId = `${review.carId}_${review.userId}`;
    const reviewDocRef = doc(this.firestore, `reviews/${reviewId}`);
    return setDoc(reviewDocRef, { 
      ...review, 
      id: reviewId, 
      status: 'pending', 
      date: new Date() 
    }, { merge: true });
  }

  /**
   * Helper to safely extract date
   */
  private getSafeDate(date: any): Date {
    if (!date) return new Date(0);
    if (date instanceof Date) return date;
    if (date.toDate && typeof date.toDate === 'function') return date.toDate();
    const d = new Date(date);
    return isNaN(d.getTime()) ? new Date(0) : d;
  }

  /**
   * Retrieves all APPROVED reviews for a specific car.
   */
  getCarReviews(carId: string): Observable<CarReview[]> {
    const q = query(
      this.reviewsCollection, 
      where('carId', '==', carId)
    );
    return (collectionData(q, { idField: 'id' }) as Observable<CarReview[]>).pipe(
      map(reviews => reviews
        .filter(r => r.status === 'approved')
        .sort((a, b) => this.getSafeDate(b.date).getTime() - this.getSafeDate(a.date).getTime())
      ),
      catchError(err => {
        console.error('Error fetching reviews:', err);
        return of([]);
      })
    );
  }

  /**
   * Get all reviews awaiting moderation (Admin).
   */
  getAllPendingReviews(): Observable<CarReview[]> {
    const q = query(this.reviewsCollection);
    return (collectionData(q, { idField: 'id' }) as Observable<CarReview[]>).pipe(
      map(reviews => reviews
        .filter(r => r.status === 'pending')
        .sort((a, b) => this.getSafeDate(b.date).getTime() - this.getSafeDate(a.date).getTime())
      ),
      catchError(err => {
        console.error('Error fetching pending reviews:', err);
        return of([]);
      })
    );
  }

  /**
   * Admin moderation action.
   */
  async updateReviewStatus(reviewId: string, status: 'approved' | 'rejected'): Promise<void> {
    const reviewDocRef = doc(this.firestore, `reviews/${reviewId}`);
    return updateDoc(reviewDocRef, { status });
  }

  /**
   * Retrieves a specific review for a user and car.
   */
  getUserReview(carId: string, userId: string): Observable<CarReview[]> {
    const reviewId = `${carId}_${userId}`;
    const q = query(this.reviewsCollection, where('id', '==', reviewId));
    return (collectionData(q) as Observable<CarReview[]>).pipe(
      catchError(() => of([]))
    );
  }
}
