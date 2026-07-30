import { Component, inject } from '@angular/core';
import { CardComponent } from '@components/card/card.component';
import { ManagerServicePaginationButtonComponent } from '../manager-service-pagination-button/manager-service-pagination-button.component';
import { ServicesStore } from '../../services.store';

@Component({
  selector: 'app-manager-service-pagination',
  imports: [CardComponent, ManagerServicePaginationButtonComponent],
  templateUrl: './manager-service-pagination.component.html',
  styleUrl: './manager-service-pagination.component.css',
})
export class ManagerServicePaginationComponent {
  readonly store = inject(ServicesStore);

  onClick(isPrev: boolean) {
    if (isPrev) {
      this.store.prevPageNumber();
    } else {
      this.store.nextPageNumber();
    }

    this.store.fetchServices();
  }
}
