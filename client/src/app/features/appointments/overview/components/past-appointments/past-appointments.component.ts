import { Component } from '@angular/core';
import { SectionContainerComponent } from '@components/section-container/section-container.component';
import { AppointmentComponent } from '../appointment/appointment.component';
import { DivisorComponent } from '@components/divisor/divisor.component';

@Component({
  selector: 'app-past-appointments',
  imports: [SectionContainerComponent, AppointmentComponent, DivisorComponent],
  templateUrl: './past-appointments.component.html',
  styleUrl: './past-appointments.component.css',
})
export class PastAppointmentsComponent {}
