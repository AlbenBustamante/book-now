import { Component } from '@angular/core';
import { SectionContainerComponent } from '@components/section-container/section-container.component';

@Component({
  selector: 'app-description',
  imports: [SectionContainerComponent],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css',
})
export class DescriptionComponent {}
