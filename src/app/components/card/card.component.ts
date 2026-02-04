import { Component, computed, input, output } from '@angular/core';
import { ButtonType, CardVariant } from '../../data-type/data-type';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  /**
   * Component Inputs using Angular Signals for reactive state management.
   */
  public readonly title = input<string>();
  public readonly content = input<string>();
  public readonly imgUrl = input<string>();
  public readonly showButton = input<boolean>(true);
  public readonly buttonLabel = input<string>();
  public readonly buttonIcon = input<string>();
  public readonly cardVariant = input<CardVariant>(CardVariant.Default);

  /**
   * Component Outputs for event delegation to parent components.
   */
  public readonly cardButtonClicked = output<void>();

  /**
   * Enums exposed to the template for type-safe comparisons.
   */
  public readonly cardVariantEnum = CardVariant;
  public readonly buttonTypeEnum = ButtonType;

  /**
   * Reactive computation of the button style based on the current card variant.
   * Business Rule: Default cards use Primary buttons, while Featured cards use Secondary.
   */
  public readonly buttonType = computed(() => {
    return this.cardVariant() === this.cardVariantEnum.Default
      ? this.buttonTypeEnum.Primary
      : this.buttonTypeEnum.Secondary;
  });

  /**
   * Handles button interaction by emitting the event to the parent container.
   */
  public onCardButtonClick(): void {
    this.cardButtonClicked.emit();
  }
}
