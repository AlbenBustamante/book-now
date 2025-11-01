import { Component } from '@angular/core';
import { ServicesCarouselComponent } from '@components/services-carousel/services-carousel.component';
import { SectionContainerComponent } from '@components/section-container/section-container.component';

@Component({
  selector: 'app-services',
  imports: [ServicesCarouselComponent, SectionContainerComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {}
