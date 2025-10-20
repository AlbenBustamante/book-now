import { Component } from '@angular/core';
import { ResultCardComponent } from './components/result-card/result-card.component';
import { DivisorComponent } from '@components/divisor/divisor.component';
import { ContainerComponent } from '@components/container/container.component';
import { SectionContainerComponent } from '@components/section-container/section-container.component';

@Component({
  selector: 'app-search',
  imports: [
    ResultCardComponent,
    DivisorComponent,
    ContainerComponent,
    SectionContainerComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export default class SearchComponent {
  readonly data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
}
