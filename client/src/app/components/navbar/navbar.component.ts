import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SearchIconComponent } from '@components/icons/search-icon/search-icon.component';
import { InputComponent } from '@components/input/input.component';

@Component({
  selector: 'app-navbar',
  imports: [NgClass, SearchIconComponent, InputComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly searching = signal<boolean>(false);

  search() {
    if (!this.searching()) {
      return this.searching.set(true);
    }

    this.searching.set(false);
    // TODO: redirect to results page
  }
}
