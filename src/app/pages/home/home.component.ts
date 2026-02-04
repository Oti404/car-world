import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { HeaderComponent } from '../../components/header/header.component';
import { AppRoutes, CardVariant } from '../../data-type/data-type';
import { UtilsService } from '../../services/utils.service';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly utilsService = inject(UtilsService);

  public readonly appRoutesEnum = AppRoutes;
  public readonly cardVariantEnum = CardVariant;

  public readonly headerContent =
    'Discover the latest automotive trends, news, and the most exciting cars in the industry';
  public readonly headerBgUrl = 'header-bg.jpg';

  /**
   * Navigates to a specific application route using the centralized UtilsService.
   */
  public navigateTo(route: AppRoutes): void {
    this.utilsService.navigateTo(route);
  }
}
