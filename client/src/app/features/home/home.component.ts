import { Component } from '@angular/core';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { ButtonComponent } from '@components/button/button.component';
import { SubtitleComponent } from '@components/subtitle/subtitle.component';
import { ProviderCardComponent } from './components/provider-card/provider-card.component';

@Component({
  selector: 'app-home',
  imports: [
    ServiceCardComponent,
    ButtonComponent,
    SubtitleComponent,
    ProviderCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {}
