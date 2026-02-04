/**
 * Configuration for UI Button variants.
 */
export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Orange = 'orange',
}

/**
 * Centralized Route definitions to prevent magic strings.
 */
export enum AppRoutes {
  Home = 'home',
  News = 'news',
  Cars = 'cars',
  Cart = 'cart',
  Reviews = 'reviews',
}

/**
 * Design variants for Generic Card components.
 */
export enum CardVariant {
  Default = 'default',
  Featured = 'featured',
}

/**
 * Represents an expert editorial review.
 */
export interface CarReview {
  car: string;
  image: string;
  expert: string;
  rating: number;
  date: string;
  title: string;
  content: string;
}

/**
 * Shared interface for navigation and utility functions.
 */
export interface NavItem {
  label: string;
  route: AppRoutes;
  icon?: string;
}
