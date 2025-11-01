import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { ContainerComponent } from '@components/container/container.component';

interface Route {
  displayName: string;
  route: string;
}

@Component({
  selector: 'app-router-navbar',
  imports: [RouterLink, RouterLinkActive, NgClass, ContainerComponent],
  templateUrl: './router-navbar.component.html',
  styleUrl: './router-navbar.component.css',
})
export class RouterNavbarComponent {
  readonly routes = input.required<Route[]>();
}
