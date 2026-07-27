import { Component, input } from '@angular/core';
import { CardComponent } from '@components/card/card.component';

@Component({
  selector: 'app-new-service-card',
  imports: [CardComponent],
  templateUrl: './new-service-card.component.html',
  styleUrl: './new-service-card.component.css',
})
export class NewServiceCardComponent {
  readonly headline = input.required<string>();
}
