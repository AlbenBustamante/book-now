import { Component } from '@angular/core';
import { SubtitleComponent } from '@components/subtitle/subtitle.component';
import { AppointmentComponent } from '../appointment/appointment.component';

@Component({
  selector: 'app-next-appointments',
  imports: [SubtitleComponent, AppointmentComponent],
  templateUrl: './next-appointments.component.html',
  styleUrl: './next-appointments.component.css',
})
export class NextAppointmentsComponent {}
