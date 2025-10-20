import { Component } from '@angular/core';
import { TitleComponent } from '@components/title/title.component';
import { NextAppointmentsComponent } from './components/next-appointments/next-appointments.component';
import { PastAppointmentsComponent } from './components/past-appointments/past-appointments.component';
import { ContainerComponent } from '@components/container/container.component';

@Component({
  selector: 'app-overview',
  imports: [
    TitleComponent,
    NextAppointmentsComponent,
    PastAppointmentsComponent,
    ContainerComponent,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export default class OverviewComponent {}
