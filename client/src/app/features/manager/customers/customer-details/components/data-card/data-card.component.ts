import { Component } from '@angular/core';
import { DivisorComponent } from '@components/divisor/divisor.component';

@Component({
  selector: 'app-data-card',
  imports: [DivisorComponent],
  templateUrl: './data-card.component.html',
  styleUrl: './data-card.component.css',
})
export class DataCardComponent {}
