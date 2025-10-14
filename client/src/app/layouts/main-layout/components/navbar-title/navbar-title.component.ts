import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-title',
  imports: [NgClass, RouterLink],
  templateUrl: './navbar-title.component.html',
  styleUrl: './navbar-title.component.css',
})
export class NavbarTitleComponent {
  readonly searching = input.required<boolean>();
}
