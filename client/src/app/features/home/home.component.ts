import { Component } from '@angular/core';
import { ButtonComponent } from '@components/button/button.component';
import { SubtitleComponent } from '@components/subtitle/subtitle.component';
import { ProviderCardComponent } from './components/provider-card/provider-card.component';
import { ServicesCarouselComponent } from '@components/services-carousel/services-carousel.component';

@Component({
  selector: 'app-home',
  imports: [
    ButtonComponent,
    SubtitleComponent,
    ProviderCardComponent,
    ServicesCarouselComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {}
