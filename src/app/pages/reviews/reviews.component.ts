import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { REVIEWS_LIST } from '../../../resources/reviews';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  /**
   * Catalog of expert automotive reviews.
   */
  public readonly reviewsList = REVIEWS_LIST;

  /**
   * Generates a numeric array to facilitate star rating rendering in the template.
   * @param rating The numeric score (1-5)
   */
  public getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
