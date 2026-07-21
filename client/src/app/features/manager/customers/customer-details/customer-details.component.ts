import { Component } from '@angular/core';
import { DataCardComponent } from './components/data-card/data-card.component';

@Component({
  selector: 'app-customer-details',
  imports: [DataCardComponent],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css',
})
export default class CustomerDetailsComponent {}
