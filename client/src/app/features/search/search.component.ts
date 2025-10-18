import { Component } from '@angular/core';
import { ResultCardComponent } from './components/result-card/result-card.component';
import { SubtitleComponent } from '@components/subtitle/subtitle.component';
import { DivisorComponent } from '@components/divisor/divisor.component';

@Component({
  selector: 'app-search',
  imports: [ResultCardComponent, SubtitleComponent, DivisorComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export default class SearchComponent {
  readonly data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
}
