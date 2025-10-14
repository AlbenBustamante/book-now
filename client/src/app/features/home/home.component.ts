import { Component } from '@angular/core';
import { ServiceCardComponent } from './service-card/service-card.component';
import { ButtonComponent } from '@components/button/button.component';
import { SubtitleComponent } from '@components/subtitle/subtitle.component';

@Component({
  selector: 'app-home',
  imports: [ServiceCardComponent, ButtonComponent, SubtitleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {}
