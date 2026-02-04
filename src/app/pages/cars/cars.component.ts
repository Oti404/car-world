import { Component, inject } from '@angular/core';
import { cars } from '../../../resources/cars';
import { CarItemComponent } from '../../components/car-item/car-item.component';
import { CarDto } from '../../data-type/car-data';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CarItemComponent],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent {
  /**
   * Data source for the vehicle catalog.
   */
  public readonly carsList = cars;

  /**
   * CartService injection for handling purchase interactions.
   */
  private readonly cartService = inject(CartService);

  /**
   * Delegates the vehicle addition process to the global cart state.
   */
  public onAddToCart(car: CarDto): void {
    this.cartService.addToCart(car);
  }
}
