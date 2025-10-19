import { Component } from '@angular/core';
import { ContainerComponent } from '@components/container/container.component';
import { TitleComponent } from '@components/title/title.component';
import { NextAppointmentsComponent } from './components/next-appointments/next-appointments.component';

@Component({
  selector: 'app-appointments',
  imports: [ContainerComponent, TitleComponent, NextAppointmentsComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css',
})
export default class AppointmentsComponent {}
