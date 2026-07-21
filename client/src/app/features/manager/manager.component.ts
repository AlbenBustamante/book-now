import { Component, signal } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@components/footer/footer.component';

@Component({
  selector: 'app-manager',
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export default class ManagerComponent {
  readonly showSideNavbar = signal<boolean>(false);
}
