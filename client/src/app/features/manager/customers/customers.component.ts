import { Component, inject } from '@angular/core';
import { CustomersGridComponent } from './components/customers-grid/customers-grid.component';
import { ManagerHeaderComponent } from '../components/manager-header/manager-header.component';
import { CustomerStatsGridComponent } from './components/customer-stats-grid/customer-stats-grid.component';
import { CustomersSearchComponent } from './components/customers-search/customers-search.component';
import { CustomersStore } from './customers.store';
import CustomerDetailsComponent from './customer-details/customer-details.component';

@Component({
  selector: 'app-customers',
  imports: [
    CustomersGridComponent,
    ManagerHeaderComponent,
    CustomerStatsGridComponent,
    CustomersSearchComponent,
    CustomerDetailsComponent,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
  providers: [CustomersStore],
})
export default class CustomersComponent {
  readonly store = inject(CustomersStore);
}
