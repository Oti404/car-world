import { Component, input, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CarDto, CarOptionDto } from '../../data-type/car-data';
import { ButtonType } from '../../data-type/data-type';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { ButtonComponent } from '../button/button.component';
import { CarService } from '../../services/car.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-car-item',
  standalone: true,
  imports: [CommonModule, CheckboxComponent, CurrencyPipe, ButtonComponent],
  templateUrl: './car-item.component.html',
  styleUrl: './car-item.component.css',
})
export class CarItemComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly carService = inject(CarService);

  /**
   * Component Inputs using Angular Signals.
   */
  public readonly carItem = input.required<CarDto>();
  public readonly buttonType = ButtonType;

  /**
   * State variables for dynamic price calculation.
   */
  public totalPrice = 0;
  public optionsPrice = 0;

  public ngOnInit(): void {
    this.calculateFinancials();
  }

  /**
   * Evaluates if the current vehicle is marked as a favorite.
   */
  public get isFavorite(): boolean {
    return this.carService.isFavorite(this.carItem().title);
  }

  /**
   * Handles the selection toggle of vehicle optional equipment.
   * Updates the local state and triggers price recalculation.
   */
  public onToggleOption(option: CarOptionDto, isSelected: boolean): void {
    option.selected = isSelected;
    this.calculateFinancials();
  }

  /**
   * Updates total price and options summary based on selected equipment.
   */
  private calculateFinancials(): void {
    this.optionsPrice = this.carItem().options
      .filter((option) => option.selected)
      .reduce((accumulator, option) => accumulator + option.price, 0);

    this.totalPrice = this.carItem().price + this.optionsPrice;
  }

  /**
   * Toggles the favorite status via the global CarService.
   */
  public onToggleFavorite(): void {
    this.carService.toggleFavorite(this.carItem().title);
  }

  /**
   * Dispatches the current vehicle configuration to the shopping cart.
   * Business Rule: The cart entry includes the aggregated total price.
   */
  public onAddToCart(): void {
    const configuredVehicle = {
      ...this.carItem(),
      price: this.totalPrice
    };

    this.cartService.addToCart(configuredVehicle);
  }
}
