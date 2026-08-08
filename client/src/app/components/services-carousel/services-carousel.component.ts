import { Component, input } from '@angular/core';
import { ServiceCardComponent } from '@components/service-card/service-card.component';
import { ServiceModel } from '@core/models/service.model';

@Component({
  selector: 'app-services-carousel',
  imports: [ServiceCardComponent],
  templateUrl: './services-carousel.component.html',
  styleUrl: './services-carousel.component.css',
})
export class ServicesCarouselComponent {
  readonly services = input.required<ServiceModel[]>();
}
