import { Component, input } from '@angular/core';
import { TitleComponent } from '@components/title/title.component';

@Component({
  selector: 'app-container',
  imports: [TitleComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent {
  readonly headline = input<string | null>(null);
  readonly description = input<string | null>(null);
}
