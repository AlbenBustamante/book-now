import { Component, input } from '@angular/core';
import { SubtitleComponent } from '@components/subtitle/subtitle.component';

@Component({
  selector: 'app-section-container',
  imports: [SubtitleComponent],
  templateUrl: './section-container.component.html',
  styleUrl: './section-container.component.css',
})
export class SectionContainerComponent {
  readonly headline = input.required<string>();
}
