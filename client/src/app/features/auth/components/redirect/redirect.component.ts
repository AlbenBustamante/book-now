import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-redirect',
  imports: [RouterLink],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.css',
})
export class RedirectComponent {
  @Input({ required: true }) route!: string;
  @Input({ required: true }) headline!: string;
}
