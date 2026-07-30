import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-manager-service-pagination-button',
  imports: [],
  templateUrl: './manager-service-pagination-button.component.html',
  styleUrl: './manager-service-pagination-button.component.css',
})
export class ManagerServicePaginationButtonComponent {
  readonly disabled = input.required<boolean | undefined>();
  readonly onClick = output<void>();

  click() {
    if (this.disabled()) {
      return;
    }

    this.onClick.emit();
  }
}
