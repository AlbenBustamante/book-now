import { Component } from '@angular/core';
import { SectionContainerComponent } from '@components/section-container/section-container.component';

@Component({
  selector: 'app-about',
  imports: [SectionContainerComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
