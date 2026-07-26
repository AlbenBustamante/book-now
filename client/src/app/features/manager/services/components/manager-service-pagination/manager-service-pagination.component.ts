import { Component } from '@angular/core';
import { CardComponent } from '@components/card/card.component';
import { ManagerServicePaginationButtonComponent } from '../manager-service-pagination-button/manager-service-pagination-button.component';

@Component({
  selector: 'app-manager-service-pagination',
  imports: [CardComponent, ManagerServicePaginationButtonComponent],
  templateUrl: './manager-service-pagination.component.html',
  styleUrl: './manager-service-pagination.component.css',
})
export class ManagerServicePaginationComponent {}
