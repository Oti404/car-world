import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarManagerComponent } from './car-manager/car-manager.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, CarManagerComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
