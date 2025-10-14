import { Component } from '@angular/core';
import { ServiceCardComponent } from './service-card/service-card.component';
import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'app-home',
  imports: [ServiceCardComponent, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {}
