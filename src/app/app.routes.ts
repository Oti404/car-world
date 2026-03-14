import { Routes } from '@angular/router';
import { AppRoutes } from './data-type/data-type';
import { HomeComponent } from './pages/home/home.component';
import { CarsComponent } from './pages/cars/cars.component';
import { NewsComponent } from './pages/news/news.component';
import { CartComponent } from './pages/cart/cart.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { GarageComponent } from './pages/garage/garage.component';
import { ComparatorComponent } from './pages/comparator/comparator.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CarDetailsComponent } from './pages/car-details/car-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { adminGuard } from './guards/admin.guard';

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
  { path: AppRoutes.Login, component: LoginComponent },
  { path: AppRoutes.Register, component: RegisterComponent },
  { path: AppRoutes.Garage, component: GarageComponent },
  { path: AppRoutes.Comparator, component: ComparatorComponent },
  { path: AppRoutes.Contact, component: ContactComponent },
  { path: AppRoutes.Profile, component: ProfileComponent },
  { path: 'cars/:id', component: CarDetailsComponent },
  { 
    path: AppRoutes.AdminDashboard, 
    component: AdminDashboardComponent,
    canActivate: [adminGuard]
  },


  /**
   * Wildcard Route
   * Redirects unknown paths back to Home to prevent 404 dead-ends.
   */
  {
    path: '**',
    redirectTo: AppRoutes.Home
  }
];
