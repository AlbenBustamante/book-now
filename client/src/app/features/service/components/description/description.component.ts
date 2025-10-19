import { Component } from '@angular/core';
import { SubtitleComponent } from '@components/subtitle/subtitle.component';

@Component({
  selector: 'app-description',
  imports: [SubtitleComponent],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css',
})
export class DescriptionComponent {}
