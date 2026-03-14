import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../services/car.service';

@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {

  transform(cars: Car[] | null, searchText: string): Car[] {
    if (!cars) return [];
    if (!searchText || searchText.trim() === '') return cars;

    const lowerText = searchText.toLowerCase().trim();

    return cars.filter(car => {
      return car.name.toLowerCase().includes(lowerText) || 
             car.engineSpecs.toLowerCase().includes(lowerText) ||
             (car.description && car.description.toLowerCase().includes(lowerText));
    });
  }

}
