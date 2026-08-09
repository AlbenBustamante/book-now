import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [NgClass],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css',
})
export class TitleComponent {
  readonly headline = input.required<string | undefined>();
  readonly align = input<'left' | 'center' | 'center sm:left'>('left');
}
