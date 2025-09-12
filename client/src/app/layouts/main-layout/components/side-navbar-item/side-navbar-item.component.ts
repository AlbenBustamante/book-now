import { Component, input } from '@angular/core';

@Component({
  selector: 'app-side-navbar-item',
  imports: [],
  templateUrl: './side-navbar-item.component.html',
  styleUrl: './side-navbar-item.component.css',
})
export class SideNavbarItemComponent {
  readonly headline = input.required<string>();
}
