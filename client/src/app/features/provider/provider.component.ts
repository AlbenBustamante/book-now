import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';

@Component({
  selector: 'app-provider',
  imports: [HeaderComponent, AboutComponent],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.css',
})
export default class ProviderComponent {}
