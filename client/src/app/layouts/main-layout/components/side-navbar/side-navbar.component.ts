import { Component, input, WritableSignal } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-side-navbar',
  imports: [NgClass],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.css',
})
export class SideNavbarComponent {
  readonly show = input.required<WritableSignal<boolean>>();
}
