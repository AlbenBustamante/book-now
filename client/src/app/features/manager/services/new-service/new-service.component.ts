import { Component, inject } from '@angular/core';
import { ManagerHeaderComponent } from '@features/manager/components/manager-header/manager-header.component';
import { NewServiceInfoFormComponent } from './components/new-service-info-form/new-service-info-form.component';
import { NewServiceAddressFormComponent } from './components/new-service-address-form/new-service-address-form.component';
import { NewServiceGalleryComponent } from './components/new-service-gallery/new-service-gallery.component';
import { NewServiceConfirmButtonComponent } from './components/new-service-confirm-button/new-service-confirm-button.component';
import { NewServiceStore } from './new-service.store';

@Component({
  selector: 'app-new-service',
  imports: [
    ManagerHeaderComponent,
    NewServiceInfoFormComponent,
    NewServiceAddressFormComponent,
    NewServiceGalleryComponent,
    NewServiceConfirmButtonComponent,
  ],
  templateUrl: './new-service.component.html',
  styleUrl: './new-service.component.css',
  providers: [NewServiceStore],
})
export default class NewServiceComponent {
  private readonly _store = inject(NewServiceStore);

  ngOnInit() {
    this._store.initialFetch();
  }
}
