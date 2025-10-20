import { Component } from '@angular/core';
import { AppointmentComponent } from '../appointment/appointment.component';
import { SectionContainerComponent } from '@components/section-container/section-container.component';
import { DivisorComponent } from '@components/divisor/divisor.component';

@Component({
  selector: 'app-next-appointments',
  imports: [AppointmentComponent, SectionContainerComponent, DivisorComponent],
  templateUrl: './next-appointments.component.html',
  styleUrl: './next-appointments.component.css',
})
export class NextAppointmentsComponent {}
