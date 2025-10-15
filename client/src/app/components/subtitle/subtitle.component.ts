import { Component, input } from '@angular/core';

@Component({
  selector: 'app-subtitle',
  imports: [],
  templateUrl: './subtitle.component.html',
  styleUrl: './subtitle.component.css',
})
export class SubtitleComponent {
  readonly headline = input.required<string>();
}
