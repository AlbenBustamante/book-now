import { Component } from '@angular/core';
import { DivisorComponent } from '@components/divisor/divisor.component';

@Component({
  selector: 'app-customer-card',
  imports: [DivisorComponent],
  templateUrl: './customer-card.component.html',
  styleUrl: './customer-card.component.css',
})
export class CustomerCardComponent {}
