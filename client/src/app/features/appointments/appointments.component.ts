import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from '@components/container/container.component';
import { RouterNavbarComponent } from '@components/router-navbar/router-navbar.component';

@Component({
  selector: 'app-appointments',
  imports: [ContainerComponent, RouterNavbarComponent, RouterOutlet],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css',
})
export default class AppointmentsComponent {
  readonly routes = [
    {
      displayName: 'Appointments',
      route: '/appointments/overview',
    },
    {
      displayName: 'Details',
      route: '/appointments/details',
    },
  ];
}
