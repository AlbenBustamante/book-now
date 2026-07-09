import { Component } from '@angular/core';
import { DivisorComponent } from '@components/divisor/divisor.component';
import { CardComponent } from '@components/card/card.component';

@Component({
  selector: 'app-customer-card',
  imports: [DivisorComponent, CardComponent],
  templateUrl: './customer-card.component.html',
  styleUrl: './customer-card.component.css',
})
export class CustomerCardComponent {}
