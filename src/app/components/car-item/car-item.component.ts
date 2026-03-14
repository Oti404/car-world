import { Component, input, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Car, CarOption } from '../../services/car.service';
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
   * Component Inputs using Angular Signals. Expected to be a Firestore Car.
   */
  public readonly carItem = input.required<Car>();
  public readonly buttonType = ButtonType;

  /**
   * State variables for dynamic price calculation.
   */
  public totalPrice = 0;
  public optionsPrice = 0;

  // Track selected options temporarily. In a real app, this should be a robust configured model.
  public selectedOptions = new Set<CarOption>();

  public ngOnInit(): void {
    this.calculateFinancials();
  }

  /**
   * Evaluates if the current vehicle is marked as a favorite.
   */
  public get isFavorite(): boolean {
    return this.carService.isFavorite(this.carItem().name);
  }

  /**
   * Handles the selection toggle of vehicle optional equipment.
   */
  public onToggleOption(option: CarOption, isSelected: boolean): void {
    if (isSelected) {
      this.selectedOptions.add(option);
    } else {
      this.selectedOptions.delete(option);
    }
    this.calculateFinancials();
  }

  public isOptionSelected(option: CarOption): boolean {
    return this.selectedOptions.has(option);
  }

  /**
   * Updates total price and options summary based on selected equipment.
   */
  private calculateFinancials(): void {
    this.optionsPrice = Array.from(this.selectedOptions)
      .reduce((acc, option) => acc + option.price, 0);

    this.totalPrice = this.carItem().basePrice + this.optionsPrice;
  }

  /**
   * Toggles the favorite status via the global CarService.
   */
  public onToggleFavorite(): void {
    this.carService.toggleFavorite(this.carItem().name);
  }

  /**
   * Dispatches the current vehicle configuration to the shopping cart.
   */
  public onAddToCart(): void {
    const configuredVehicle = {
      ...this.carItem(),
      // Calculate final price locally
      configuredPrice: this.totalPrice,
      selectedOptions: Array.from(this.selectedOptions)
    };

    // Needs fixing on the cart service side down the road to handle the new shape!
    this.cartService.addToCart(configuredVehicle as any);
  }
}
