import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    this.supportService.getAllInquiries().subscribe(data => {
      this.inquiries = data;
      this.isLoading = false;
    });
  }

  async updateStatus(id: string, status: Inquiry['status']) {
    try {
      await this.supportService.updateInquiryStatus(id, status);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  }
}
