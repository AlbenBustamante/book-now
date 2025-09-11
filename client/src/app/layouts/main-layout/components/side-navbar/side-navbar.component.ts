import { Component, signal } from '@angular/core';
import { MenuIconComponent } from '../menu-icon/menu-icon.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-side-navbar',
  imports: [NgClass, MenuIconComponent],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.css',
})
export class SideNavbarComponent {
  readonly show = signal<boolean>(false);
}
