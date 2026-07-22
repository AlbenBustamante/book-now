import { Component } from '@angular/core';
import { DataCardComponent } from './components/data-card/data-card.component';
import { AppointmentHistoryComponent } from './components/appointment-history/appointment-history.component';
import { StatsCardsComponent } from './components/stats-cards/stats-cards.component';
import { CustomerReviewsComponent } from './components/customer-reviews/customer-reviews.component';

@Component({
  selector: 'app-customer-details',
  imports: [
    DataCardComponent,
    AppointmentHistoryComponent,
    StatsCardsComponent,
    CustomerReviewsComponent,
  ],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css',
})
export default class CustomerDetailsComponent {}
