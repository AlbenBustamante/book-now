import { Component } from '@angular/core';
import { SubtitleComponent } from '@components/subtitle/subtitle.component';

@Component({
  selector: 'app-about',
  imports: [SubtitleComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
