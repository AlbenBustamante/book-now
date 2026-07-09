import { Component } from '@angular/core';
import { CustomerCardComponent } from '../customer-card/customer-card.component';

@Component({
  selector: 'app-customers-grid',
  imports: [CustomerCardComponent],
  templateUrl: './customers-grid.component.html',
  styleUrl: './customers-grid.component.css',
})
export class CustomersGridComponent {}
