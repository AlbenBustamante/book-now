import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@components/button/button.component';
import { TitleComponent } from '@components/title/title.component';
import { ServiceStore } from '@features/service/service.store';
import { DivisorComponent } from '@components/divisor/divisor.component';

@Component({
  selector: 'app-header',
  imports: [
    TitleComponent,
    ButtonComponent,
    CurrencyPipe,
    RouterLink,
    DivisorComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly store = inject(ServiceStore);
}
