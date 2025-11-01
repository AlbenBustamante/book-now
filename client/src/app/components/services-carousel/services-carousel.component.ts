import { Component } from '@angular/core';
import { ServiceCardComponent } from '@components/service-card/service-card.component';

@Component({
  selector: 'app-services-carousel',
  imports: [ServiceCardComponent],
  templateUrl: './services-carousel.component.html',
  styleUrl: './services-carousel.component.css',
})
export class ServicesCarouselComponent {}
