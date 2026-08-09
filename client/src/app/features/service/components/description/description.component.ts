import { Component, inject } from '@angular/core';
import { SectionContainerComponent } from '@components/section-container/section-container.component';
import { ServiceStore } from '@features/service/service.store';

@Component({
  selector: 'app-description',
  imports: [SectionContainerComponent],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css',
})
export class DescriptionComponent {
  readonly store = inject(ServiceStore);
}
