import { Component } from '@angular/core';
import { CardComponent } from '@components/card/card.component';

@Component({
  selector: 'app-stats-cards',
  imports: [CardComponent],
  templateUrl: './stats-cards.component.html',
  styleUrl: './stats-cards.component.css',
})
export class StatsCardsComponent {}
