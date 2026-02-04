import { Component, input, output } from '@angular/core';
import { ButtonType } from '../../data-type/data-type';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  buttonType = input<ButtonType>(ButtonType.Primary);
  buttonLabel = input<string>();
  buttonIcon = input<string>();
  buttonClicked = output<void>();

  onButtonClick(): void {
    this.buttonClicked.emit();
  }
}
