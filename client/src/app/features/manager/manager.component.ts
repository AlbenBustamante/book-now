import { Component, signal } from '@angular/core';
import { SideNavbarComponent } from '@components/side-navbar/side-navbar.component';

@Component({
  selector: 'app-manager',
  imports: [SideNavbarComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css',
})
export default class ManagerComponent {
  readonly showSideNavbar = signal<boolean>(false);
}
