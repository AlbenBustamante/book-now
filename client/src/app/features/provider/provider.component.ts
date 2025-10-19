import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-provider',
  imports: [HeaderComponent],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.css',
})
export default class ProviderComponent {}
