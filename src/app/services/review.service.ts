import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api.config';

export interface CarReview {
  id?: string;
  carId: string;
  userId: string;
  userName?: string;
  rating: number;
  comment: string;
  photo?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt?: any;
  user?: { id: string; name: string };
}

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private http = inject(HttpClient);
  private readonly url = `${API_URL}/reviews`;

  getCarReviews(carId: string): Observable<CarReview[]> {
    return this.http.get<CarReview[]>(`${this.url}/car/${carId}`);
  }

  getAllPendingReviews(): Observable<CarReview[]> {
    return this.http.get<CarReview[]>(`${this.url}/pending`);
  }

  saveReview(review: Partial<CarReview>): Observable<CarReview> {
    return this.http.post<CarReview>(this.url, review);
  }

  updateReviewStatus(reviewId: string, status: 'APPROVED' | 'REJECTED'): Observable<CarReview> {
    return this.http.put<CarReview>(`${this.url}/${reviewId}/status`, { status });
  }
}
