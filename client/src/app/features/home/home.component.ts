import { Component } from '@angular/core';
import { ServiceCardComponent } from './service-card/service-card.component';

@Component({
  selector: 'app-home',
  imports: [ServiceCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {}
