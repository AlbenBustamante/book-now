import { Component } from '@angular/core';
import { DataCardComponent } from './components/data-card/data-card.component';
import { AppointmentHistoryComponent } from './components/appointment-history/appointment-history.component';

@Component({
  selector: 'app-customer-details',
  imports: [DataCardComponent, AppointmentHistoryComponent],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css',
})
export default class CustomerDetailsComponent {}
