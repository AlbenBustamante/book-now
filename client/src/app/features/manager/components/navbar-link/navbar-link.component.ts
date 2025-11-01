import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-link',
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navbar-link.component.html',
  styleUrl: './navbar-link.component.css',
})
export class NavbarLinkComponent {
  readonly name = input.required<string>();
  readonly route = input.required<string>();
}
