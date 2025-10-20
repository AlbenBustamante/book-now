import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContainerComponent } from '@components/container/container.component';
import { TitleComponent } from '@components/title/title.component';

interface Route {
  displayName: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    ContainerComponent,
    RouterLinkActive,
    NgClass,
    TitleComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly routes: Route[] = [
    {
      displayName: 'Profile',
      route: 'profile',
    },
    {
      displayName: 'Security',
      route: 'security',
    },
  ];
}
