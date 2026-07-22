import { Component } from '@angular/core';
import { CardComponent } from '@components/card/card.component';
import { DivisorComponent } from '@components/divisor/divisor.component';

@Component({
  selector: 'app-customer-reviews',
  imports: [CardComponent, DivisorComponent],
  templateUrl: './customer-reviews.component.html',
  styleUrl: './customer-reviews.component.css',
})
export class CustomerReviewsComponent {}
