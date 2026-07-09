import { Component } from '@angular/core';
import { CustomersGridComponent } from './components/customers-grid/customers-grid.component';
import { ManagerHeaderComponent } from '../components/manager-header/manager-header.component';

@Component({
  selector: 'app-customers',
  imports: [CustomersGridComponent, ManagerHeaderComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export default class CustomersComponent {}
