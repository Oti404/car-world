import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { SupportService, Inquiry } from '../../../services/support.service';

@Component({
  selector: 'app-support-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './support-manager.component.html',
  styleUrl: './support-manager.component.css'
})
export class SupportManagerComponent implements OnInit {
  private supportService = inject(SupportService);
  
  public inquiries: Inquiry[] = [];
  public isLoading = true;

  ngOnInit() {
    this.supportService.getAllInquiries().subscribe({
      next: (data) => {
        // Client-side filtering to avoid complex Firestore indexes
        this.inquiries = data.filter(inquiry => inquiry.status !== 'RESOLVED');
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error loading inquiries:", err);
        this.isLoading = false;
      }
    });
  }

  trackById(index: number, item: Inquiry): string {
    return item.id || index.toString();
  }

  async updateStatus(id: string, status: Inquiry['status']) {
    try {
      await firstValueFrom(this.supportService.updateInquiryStatus(id, status));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  }
}
