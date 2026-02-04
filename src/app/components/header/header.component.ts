import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonType } from '../../data-type/data-type';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public readonly bgImgUrl = input.required<string>();
  public readonly title = input<string>('Default Title');
  public readonly content = input<string>('Default content');
  public readonly showButton = input<boolean>(true);
  public readonly buttonLabel = input<string>('Click me');
  public readonly buttonIcon = input<string>('');
  public readonly buttonType = input<ButtonType>(ButtonType.Primary);

  public readonly headerButtonClicked = output<void>();

  public readonly buttonTypeEnum = ButtonType;
}
