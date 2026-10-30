import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, tap, switchMap } from 'rxjs';
import { Car, CarService, CarOption } from '../../services/car.service';
import { CartService, CartItem } from '../../services/cart.service';
import { ComparatorService } from '../../services/comparator.service';
import { CarReview, ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private carService = inject(CarService);
  private cartService = inject(CartService);
  private reviewService = inject(ReviewService);
  public comparatorService = inject(ComparatorService);

  public car$!: Observable<Car>;
  public reviews$!: Observable<CarReview[]>;
  public activeImageIndex = 0;

  // Configuration State
  public selectedColor: CarOption | null = null;
  public selectedWheels: CarOption | null = null;
  public selectedInterior: CarOption | null = null;
  public currentTotalPrice = 0;

  ngOnInit() {
    this.car$ = this.route.paramMap.pipe(
      switchMap((params: any) => {
        const id = params.get('id')!;
        this.reviews$ = this.reviewService.getCarReviews(id);
        return this.carService.getCarById(id);
      }),
      tap(car => {
        if (car) {
          // Set defaults
          if (!this.selectedColor && car.options?.colors?.length > 0) this.selectedColor = car.options.colors[0];
          if (!this.selectedWheels && car.options?.wheels?.length > 0) this.selectedWheels = car.options.wheels[0];
          if (!this.selectedInterior && car.options?.interior?.length > 0) this.selectedInterior = car.options.interior[0];
          this.calculateTotalPrice(car);
        }
      })
    );
  }

  public calculateTotalPrice(car: Car) {
    let total = car.basePrice;
    if (this.selectedColor) total += this.selectedColor.price;
    if (this.selectedWheels) total += this.selectedWheels.price;
    if (this.selectedInterior) total += this.selectedInterior.price;
    this.currentTotalPrice = total;
  }

  public selectColor(car: Car, color: CarOption) {
    this.selectedColor = color;
    this.calculateTotalPrice(car);
  }

  public selectWheels(car: Car, wheels: CarOption) {
    this.selectedWheels = wheels;
    this.calculateTotalPrice(car);
  }

  public selectInterior(car: Car, interior: CarOption) {
    this.selectedInterior = interior;
    this.calculateTotalPrice(car);
  }

  public setActiveImage(index: number) {
    this.activeImageIndex = index;
  }

  public onAddToCart(car: Car) {
    const cartItem: CartItem = {
      ...car,
      configuredPrice: this.currentTotalPrice,
      // We can also store the selected options names for clarity in the cart/order
      description: `${car.description} | Configration: ${this.selectedColor?.name}, ${this.selectedWheels?.name}, ${this.selectedInterior?.name}`
    };
    this.cartService.addToCart(cartItem);
    
    // Optional: add a visual feedback or redirect
    alert(`Vehicle ${car.name} added to cart!`);
  }

  public toggleCompare(car: Car) {
    this.comparatorService.toggleCar(car);
  }

  public handleImageError(event: any, fallback: string = 'assets/placeholder-car.jpg') {
    event.target.src = fallback;
  }
}
