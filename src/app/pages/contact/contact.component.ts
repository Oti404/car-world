import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupportService, Inquiry } from '../../services/support.service';
import { ButtonComponent } from '../../components/button/button.component';
import { ButtonType } from '../../data-type/data-type';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  private supportService = inject(SupportService);
  
  public formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  public isSubmitting = false;
  public isSuccess = false;
  public buttonType = ButtonType;

  async onSubmit() {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    this.isSubmitting = true;
    try {
      await this.supportService.submitInquiry(this.formData);
      this.isSuccess = true;
      this.formData = { name: '', email: '', subject: '', message: '' };
    } catch (err) {
      console.error("Error submitting inquiry:", err);
      alert("Failed to send message. Please try again later.");
    } finally {
      this.isSubmitting = false;
    }
  }
}
