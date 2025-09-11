import { NgClass } from '@angular/common';
import { Component, input, output, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from '@components/input/input.component';
import { SearchIconComponent } from '../search-icon/search-icon.component';

@Component({
  selector: 'app-navbar-search-input',
  imports: [InputComponent, ReactiveFormsModule, NgClass, SearchIconComponent],
  templateUrl: './navbar-search-input.component.html',
  styleUrl: './navbar-search-input.component.css',
})
export class NavbarSearchInputComponent {
  readonly onSearch = output<void>();
  readonly searching = input.required<WritableSignal<boolean>>();
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
}
