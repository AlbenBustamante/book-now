import { Component } from '@angular/core';
import { NavbarLinkComponent } from '../navbar-link/navbar-link.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [NavbarLinkComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
