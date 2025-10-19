import { Component } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'app-appointment',
  imports: [ButtonComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
})
export class AppointmentComponent {}
