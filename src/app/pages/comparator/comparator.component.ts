import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ComparatorService } from '../../services/comparator.service';
import { Car } from '../../services/car.service';

@Component({
  selector: 'app-comparator',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './comparator.component.html',
  styleUrl: './comparator.component.css'
})
export class ComparatorComponent {
  public readonly comparatorService = inject(ComparatorService);

  public removeCar(car: Car): void {
    this.comparatorService.toggleCar(car);
  }

  public clearAll(): void {
    this.comparatorService.clear();
  }
}
