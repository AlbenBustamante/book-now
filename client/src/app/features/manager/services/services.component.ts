import { Component, inject } from '@angular/core';
import { ManagerHeaderComponent } from '../components/manager-header/manager-header.component';
import { ManagerSearchInputComponent } from '../components/manager-search-input/manager-search-input.component';
import { ButtonComponent } from '@components/button/button.component';
import { ManagerServiceCardComponent } from './components/manager-service-card/manager-service-card.component';
import { ManagerServicePaginationComponent } from './components/manager-service-pagination/manager-service-pagination.component';
import { ServicesStore } from './services.store';

@Component({
  selector: 'app-services',
  imports: [
    ManagerHeaderComponent,
    ManagerSearchInputComponent,
    ButtonComponent,
    ManagerServiceCardComponent,
    ManagerServicePaginationComponent,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
  providers: [ServicesStore],
})
export default class ServicesComponent {
  readonly store = inject(ServicesStore);

  ngOnInit() {
    this.store.fetchServices();
  }
}
