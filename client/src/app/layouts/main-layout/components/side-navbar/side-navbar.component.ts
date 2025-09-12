import { Component, input, WritableSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import { SideNavbarItemComponent } from '../side-navbar-item/side-navbar-item.component';
import { DivisorComponent } from '@components/divisor/divisor.component';

@Component({
  selector: 'app-side-navbar',
  imports: [NgClass, SideNavbarItemComponent, DivisorComponent],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.css',
})
export class SideNavbarComponent {
  readonly show = input.required<WritableSignal<boolean>>();
}
