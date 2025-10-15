import { NgClass } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { NavbarSearchInputComponent } from '../navbar-search-input/navbar-search-input.component';
import { NavbarTitleComponent } from '../navbar-title/navbar-title.component';
import { ClickOutsideDirective } from '@directives/click-outside.directive';

@Component({
  selector: 'app-navbar',
  imports: [
    NgClass,
    DropdownComponent,
    NavbarSearchInputComponent,
    NavbarTitleComponent,
    ClickOutsideDirective,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly searching = signal<boolean>(false);
  readonly showDropdown = signal<boolean>(false);

  constructor(private readonly _router: Router) {}

  onShowDropdown() {
    this.showDropdown.set(!this.showDropdown());
  }

  search(route: string) {
    const width = window.innerWidth;

    if (width < 640) {
      return this.searching.set(true);
    }

    this.searching.set(false);
    // TODO: redirect to results page
    this._router.navigateByUrl(route);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = window.innerWidth;

    if (width < 640) {
      this.searching.set(false);
    }
  }
}
