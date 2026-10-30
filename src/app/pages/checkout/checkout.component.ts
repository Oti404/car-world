import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private fb = inject(FormBuilder);
  public cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);

  public checkoutForm!: FormGroup;
  public isProcessing = false;
  public isPaymentStep = false;
  public checkoutFinished = false;

  ngOnInit() {
    // Redirect if cart is empty
    if (this.cartService.cartItems.length === 0) {
      this.router.navigate(['/cart']);
      return;
    }

    const user = this.authService.getCurrentUser();

    this.checkoutForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+ ]{10,15}$/)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5,6}$/)]]
    });

    if (user) {
      // Pre-fill email if needed, though not in the form fields I defined
    }
  }

  public async onSubmit() {
    if (this.checkoutForm.invalid) return;

    if (!this.isPaymentStep) {
      // Step 1: Billing Form -> Payment Step
      this.isPaymentStep = true;
      return;
    }

    // Step 2: Payment Simulation -> Finalize
    this.isProcessing = true;

    try {
      // Simulate network delay for payment authorization
      await new Promise(resolve => setTimeout(resolve, 2000));

      const billingDetails = this.checkoutForm.value;
      await this.cartService.checkout(billingDetails);

      this.checkoutFinished = true;
      alert('Order placed successfully! Thank you for choosing Porsche.');
      this.router.navigate(['/garage']);
    } catch (error) {
      alert('There was an error processing your order. Please try again.');
      this.isProcessing = false;
    }
  }
}
