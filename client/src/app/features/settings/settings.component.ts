import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export default class SettingsComponent {}
