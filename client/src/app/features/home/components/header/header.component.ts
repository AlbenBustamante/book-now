import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);

  readonly form = this._fb.group({
    search: ['', Validators.required],
  });

  goToSearch() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    const keywords = this.form.value.search!;

    this._router.navigateByUrl(`/search?keywords=${keywords}`);
  }
}
