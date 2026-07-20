import { Component } from '@angular/core';
import { CustomersGridComponent } from './components/customers-grid/customers-grid.component';
import { ManagerHeaderComponent } from '../components/manager-header/manager-header.component';
import { CustomerStatsGridComponent } from './components/customer-stats-grid/customer-stats-grid.component';
import { CustomersSearchComponent } from './components/customers-search/customers-search.component';

@Component({
  selector: 'app-customers',
  imports: [
    CustomersGridComponent,
    ManagerHeaderComponent,
    CustomerStatsGridComponent,
    CustomersSearchComponent,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export default class CustomersComponent {}
