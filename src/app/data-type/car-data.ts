/**
 * Represents a standard News entry within the application.
 */
export interface NewsDto {
  title: string;
  image: string;
  imageAlt: string;
  content: string;
}

/**
 * Technical specifications for a vehicle entity.
 */
export interface CarSpecificationsDto {
  modelYear: string;
  mileage: string;
  engine: string;
  power: string;
}

/**
 * Represents optional vehicle equipment and its selection state.
 */
export interface CarOptionDto {
  name: string;
  price: number;
  selected: boolean;
}

/**
 * Core Vehicle Data Model.
 * Business Rule: Features a unique ID (Long/Number) for efficient
 * CRUD operations and state management within the CartService.
 */
export interface CarDto {
  id: number;
  title: string;
  image: string;
  imageAlt: string;
  price: number;
  specifications: CarSpecificationsDto;
  description: string;
  options: CarOptionDto[];
  addedToFavorites: boolean;
}
