import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { CardComponent } from '@components/card/card.component';

@Component({
  selector: 'app-customer-stat-card',
  imports: [CardComponent, NgClass],
  templateUrl: './customer-stat-card.component.html',
  styleUrl: './customer-stat-card.component.css',
})
export class CustomerStatCardComponent {
  readonly headline = input.required<string>();
  readonly value = input.required<number>();
  readonly color = input.required<'primary' | 'yellow' | 'gray'>();

  private readonly bgMap = {
    primary: 'bg-primary-100',
    yellow: 'bg-yellow-100',
    gray: 'bg-gray-100',
  };

  private readonly iconMap = {
    primary: 'bg-primary-600',
    yellow: 'bg-yellow-600',
    gray: 'bg-gray-600',
  };

  readonly bgColor = computed(() => this.bgMap[this.color()]);
  readonly iconColor = computed(() => this.iconMap[this.color()]);
}
