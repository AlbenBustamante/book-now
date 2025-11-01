import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'app-appointment',
  imports: [ButtonComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
})
export class AppointmentComponent {
  private readonly _router = inject(Router);
  readonly time = input.required<'past' | 'next'>();

  goToDetails() {
    this._router.navigateByUrl('/appointments/details');
  }
}
