import { Component } from '@angular/core';
import { SubtitleComponent } from '@components/subtitle/subtitle.component';
import { ServicesCarouselComponent } from '@components/services-carousel/services-carousel.component';

@Component({
  selector: 'app-services',
  imports: [SubtitleComponent, ServicesCarouselComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {}
