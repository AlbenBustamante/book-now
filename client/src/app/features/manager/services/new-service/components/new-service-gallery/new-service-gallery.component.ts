import { Component, computed, signal } from '@angular/core';
import { NewServiceCardComponent } from '../new-service-card/new-service-card.component';

@Component({
  selector: 'app-new-service-gallery',
  imports: [NewServiceCardComponent],
  templateUrl: './new-service-gallery.component.html',
  styleUrl: './new-service-gallery.component.css',
})
export class NewServiceGalleryComponent {
  readonly selectedFile = signal<File | undefined>(undefined);
  readonly url = computed(() => {
    const selectedFile = this.selectedFile();

    if (!selectedFile) {
      return 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg';
    }

    const objectUrl = URL.createObjectURL(this.selectedFile()!);
    return objectUrl;
  });

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length >= 1) {
      this.selectedFile.set(files[0]);
    }
  }
}
