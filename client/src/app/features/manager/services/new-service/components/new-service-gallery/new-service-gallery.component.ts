import { Component, inject } from '@angular/core';
import { NewServiceCardComponent } from '../new-service-card/new-service-card.component';
import { NewServiceStore } from '../../new-service.store';

@Component({
  selector: 'app-new-service-gallery',
  imports: [NewServiceCardComponent],
  templateUrl: './new-service-gallery.component.html',
  styleUrl: './new-service-gallery.component.css',
})
export class NewServiceGalleryComponent {
  readonly store = inject(NewServiceStore);

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length >= 1) {
      this.store.setCoverPhoto(files[0]);
    }
  }
}
