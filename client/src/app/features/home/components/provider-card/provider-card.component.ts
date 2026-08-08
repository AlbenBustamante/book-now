import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserModel } from '@core/models/user.model';

@Component({
  selector: 'app-provider-card',
  imports: [RouterLink],
  templateUrl: './provider-card.component.html',
  styleUrl: './provider-card.component.css',
})
export class ProviderCardComponent {
  readonly provider = input.required<UserModel>();
}
