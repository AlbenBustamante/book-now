import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';

@Component({
  selector: 'app-account-layout',
  imports: [RouterOutlet, SideNavbarComponent],
  templateUrl: './account-layout.component.html',
  styleUrl: './account-layout.component.css',
})
export class AccountLayoutComponent {}
