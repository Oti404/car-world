import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { AppRoutes, CardVariant } from '../../data-type/data-type';
import { UtilsService } from '../../services/utils.service';
import { CardComponent } from '../../components/card/card.component';
import { CarService, Car } from '../../services/car.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly utilsService = inject(UtilsService);
  private readonly carService = inject(CarService);

  public readonly appRoutesEnum = AppRoutes;
  public readonly cardVariantEnum = CardVariant;

  public readonly headerContent =
    'Connecting extraordinary cars with extraordinary people. Explore our curated selection of high-performance vehicles and industry-leading insights.';
  public readonly headerBgUrl = 'header-bg.webp';

  public featuredCars$!: Observable<Car[]>;

  ngOnInit() {
    // Fetch all cars but slice the first 3 to act as "Featured" items on the homepage
    this.featuredCars$ = this.carService.getCars().pipe(
      map(cars => cars.slice(0, 3))
    );
  }

  /**
   * Navigates to a specific application route using the centralized UtilsService.
   */
  public navigateTo(route: AppRoutes): void {
    this.utilsService.navigateTo(route);
  }
}
