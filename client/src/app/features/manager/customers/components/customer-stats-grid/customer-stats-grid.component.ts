import { Component } from '@angular/core';
import { CustomerStatCardComponent } from '../customer-stat-card/customer-stat-card.component';

@Component({
  selector: 'app-customer-stats-grid',
  imports: [CustomerStatCardComponent],
  templateUrl: './customer-stats-grid.component.html',
  styleUrl: './customer-stats-grid.component.css',
})
export class CustomerStatsGridComponent {}
