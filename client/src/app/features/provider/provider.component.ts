import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';

@Component({
  selector: 'app-provider',
  imports: [HeaderComponent, AboutComponent, ServicesComponent],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.css',
})
export default class ProviderComponent {}
