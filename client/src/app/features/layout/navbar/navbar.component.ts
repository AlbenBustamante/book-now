import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SearchIconComponent } from '@components/icons/search-icon/search-icon.component';
import { InputComponent } from '@components/input/input.component';
import { DropdownComponent } from '../components/dropdown/dropdown.component';

@Component({
  selector: 'app-navbar',
  imports: [
    NgClass,
    RouterLink,
    SearchIconComponent,
    InputComponent,
    ReactiveFormsModule,
    DropdownComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  readonly searching = signal<boolean>(false);
  readonly showDropdown = signal<boolean>(false);
  readonly form;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _router: Router
  ) {
    this.form = this._fb.group({
      input: ['', Validators.required],
      type: ['provider', Validators.required],
    });
  }

  toggleSearch() {
    if (!this.searching()) {
      return this.searching.set(true);
    }

    this.search();
  }

  search() {
    this.searching.set(false);
    // TODO: redirect to results page
    this._router.navigate(['']);
  }
}
