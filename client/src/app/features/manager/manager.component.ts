import { Component, signal } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manager',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export default class ManagerComponent {
  readonly showSideNavbar = signal<boolean>(false);
}
