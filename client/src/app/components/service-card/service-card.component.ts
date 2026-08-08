import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceModel } from '@core/models/service.model';

@Component({
  selector: 'app-service-card',
  imports: [RouterLink],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css',
})
export class ServiceCardComponent {
  readonly service = input.required<ServiceModel>();
}
