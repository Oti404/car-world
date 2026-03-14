import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarItemComponent } from '../../components/car-item/car-item.component';
import { Car, CarService } from '../../services/car.service';
import { CartService } from '../../services/cart.service';
import { Observable, map } from 'rxjs';
import { SearchFilterPipe } from '../../pipes/search-filter.pipe';
import { ComparatorService } from '../../services/comparator.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, FormsModule, CarItemComponent, SearchFilterPipe, RouterLink],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit {
  /**
   * Data source for the vehicle catalog pushed directly from Firestore.
   */
  public carsList$!: Observable<Car[]>;
  public searchTerm: string = '';

  private readonly carService = inject(CarService);
  private readonly cartService = inject(CartService);
  public readonly comparatorService = inject(ComparatorService);

  ngOnInit() {
    this.carsList$ = this.carService.getCars().pipe(
      map(cars => cars.filter(car => car.stock !== undefined && car.stock > 0))
    );
  }

  /**
   * Delegates the vehicle addition process to the global cart state.
   */
  public onAddToCart(car: Car): void {
    // Note: Since Car has a completely different structure now,
    // CartService might need updating. Temporarily mapping to any
    // or adapting on the fly until CartService is refactored.
    this.cartService.addToCart(car as any);
  }
}

