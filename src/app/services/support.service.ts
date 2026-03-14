import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, query, orderBy, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  message: string;
  date: any;
  status: 'new' | 'read' | 'resolved';
  subject?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private firestore = inject(Firestore);
  private inquiriesCollection = collection(this.firestore, 'inquiries');

  /**
   * Submit a new inquiry from the contact form.
   */
  submitInquiry(inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>): Promise<any> {
    const newInquiry: Inquiry = {
      ...inquiry,
      date: Timestamp.now(),
      status: 'new'
    };
    return addDoc(this.inquiriesCollection, newInquiry);
  }

  /**
   * Get all inquiries for the admin dashboard, ordered by date.
   */
  getAllInquiries(): Observable<Inquiry[]> {
    const q = query(this.inquiriesCollection, orderBy('date', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Inquiry[]>;
  }

  /**
   * Update the status of an inquiry (e.g., mark as read or resolved).
   */
  updateInquiryStatus(id: string, status: Inquiry['status']): Promise<void> {
    const docRef = doc(this.firestore, `inquiries/${id}`);
    return updateDoc(docRef, { status });
  }
}
