import { Component, input } from '@angular/core';
import { TitleComponent } from '@components/title/title.component';

@Component({
  selector: 'app-manager-header',
  imports: [TitleComponent],
  templateUrl: './manager-header.component.html',
  styleUrl: './manager-header.component.css',
})
export class ManagerHeaderComponent {
  readonly headline = input.required<string>();
  readonly description = input.required<string>();
}
