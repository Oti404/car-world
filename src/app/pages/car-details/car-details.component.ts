import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Car, CarService } from '../../services/car.service';
import { CartService } from '../../services/cart.service';
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

  ngOnInit() {
    this.car$ = this.route.paramMap.pipe(
      switchMap((params: any) => {
        const id = params.get('id')!;
        this.reviews$ = this.reviewService.getCarReviews(id);
        return this.carService.getCarById(id);
      })
    );
  }

  public setActiveImage(index: number) {
    this.activeImageIndex = index;
  }

  public onAddToCart(car: Car) {
    this.cartService.addToCart(car as any);
  }

  public toggleCompare(car: Car) {
    this.comparatorService.toggleCar(car);
  }
}
