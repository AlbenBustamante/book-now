import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { DescriptionComponent } from './components/description/description.component';

@Component({
  selector: 'app-service',
  imports: [HeaderComponent, DescriptionComponent],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
})
export default class ServiceComponent {}
