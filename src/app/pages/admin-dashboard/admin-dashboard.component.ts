import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CarManagerComponent } from './car-manager/car-manager.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { SupportManagerComponent } from './support-manager/support-manager.component';
import { NewsManagerComponent } from './news-manager/news-manager.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, CarManagerComponent, PendingOrdersComponent, SupportManagerComponent, NewsManagerComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['scroll']) {
        setTimeout(() => this.scrollTo(params['scroll']), 100);
      }
    });
  }

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
