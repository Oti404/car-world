import { Routes } from '@angular/router';
import { AppRoutes } from './data-type/data-type';
import { HomeComponent } from './pages/home/home.component';
import { CarsComponent } from './pages/cars/cars.component';
import { NewsComponent } from './pages/news/news.component';
import { CartComponent } from './pages/cart/cart.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';

export const routes: Routes = [
  /**
   * Root Redirection
   * Automatically routes the user to the Home view on application load.
   */
  {
    path: '',
    redirectTo: AppRoutes.Home,
    pathMatch: 'full'
  },

  /**
   * Application Feature Routes
   * Mapped to the centralized AppRoutes Enum for type-safety.
   */
  { path: AppRoutes.Home, component: HomeComponent },
  { path: AppRoutes.News, component: NewsComponent },
  { path: AppRoutes.Cars, component: CarsComponent },
  { path: AppRoutes.Cart, component: CartComponent },
  { path: AppRoutes.Reviews, component: ReviewsComponent },

  /**
   * Wildcard Route
   * Redirects unknown paths back to Home to prevent 404 dead-ends.
   */
  {
    path: '**',
    redirectTo: AppRoutes.Home
  }
];
