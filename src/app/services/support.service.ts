import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../api.config';

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  date?: any;
  status: 'NEW' | 'READ' | 'RESOLVED';
  userId?: string;
}

@Injectable({ providedIn: 'root' })
export class SupportService {
  private http = inject(HttpClient);
  private readonly url = `${API_URL}/contact`;

  submitInquiry(inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>): Observable<Inquiry> {
    return this.http.post<Inquiry>(this.url, inquiry);
  }

  getAllInquiries(): Observable<Inquiry[]> {
    return this.http.get<Inquiry[]>(this.url);
  }

  updateInquiryStatus(id: string, status: Inquiry['status']): Observable<Inquiry> {
    return this.http.put<Inquiry>(`${this.url}/${id}/status`, { status });
  }
}
