import { NgClass } from '@angular/common';
import { Component, input, output, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchIconComponent } from '../search-icon/search-icon.component';
import { LeftArrowIconComponent } from '../left-arrow-icon/left-arrow-icon.component';

@Component({
  selector: 'app-navbar-search-input',
  imports: [
    ReactiveFormsModule,
    NgClass,
    SearchIconComponent,
    LeftArrowIconComponent,
  ],
  templateUrl: './navbar-search-input.component.html',
  styleUrl: './navbar-search-input.component.css',
})
export class NavbarSearchInputComponent {
  readonly onSearch = output<string>();
  readonly searching = input.required<WritableSignal<boolean>>();
  readonly form;

  constructor(private readonly _fb: FormBuilder) {
    this.form = this._fb.group({
      input: ['', Validators.required],
    });
  }

  onSubmit() {
    const toSearch = this.form.value!;
    console.table({ toSearch });
    this.onSearch.emit(`/search?keywords=${toSearch.input}`);
  }
}
