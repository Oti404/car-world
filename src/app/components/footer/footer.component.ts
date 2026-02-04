import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  /**
   * Computed property to ensure the copyright year is always current.
   */
  public readonly currentYear = computed(() => new Date().getFullYear());

  /**
   * Collaboration details for portfolio branding.
   */
  public readonly developerName = 'Otniel';
  public readonly partnerName = 'MHP Workshop';
}
