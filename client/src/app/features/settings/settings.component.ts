import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from "@components/container/container.component";

@Component({
  selector: 'app-settings',
  imports: [NavbarComponent, RouterOutlet, ContainerComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export default class SettingsComponent {}
