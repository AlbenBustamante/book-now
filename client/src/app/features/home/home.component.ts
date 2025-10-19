import { Component } from '@angular/core';
import { SubtitleComponent } from '@components/subtitle/subtitle.component';
import { ProviderCardComponent } from './components/provider-card/provider-card.component';
import { ServicesCarouselComponent } from '@components/services-carousel/services-carousel.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-home',
  imports: [
    SubtitleComponent,
    ProviderCardComponent,
    ServicesCarouselComponent,
    HeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {}
