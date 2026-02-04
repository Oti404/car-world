/**
 * Represents a simplified data structure for News content.
 * Note: Consider moving this to car-data.ts if it scales with vehicle-specific logic.
 */
export interface NewsDto {
  title: string;
  image: string;
  imageAlt: string;
  content: string;
}
