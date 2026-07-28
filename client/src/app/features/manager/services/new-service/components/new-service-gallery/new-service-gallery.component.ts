import { Component } from '@angular/core';
import { NewServiceCardComponent } from '../new-service-card/new-service-card.component';

@Component({
  selector: 'app-new-service-gallery',
  imports: [NewServiceCardComponent],
  templateUrl: './new-service-gallery.component.html',
  styleUrl: './new-service-gallery.component.css',
})
export class NewServiceGalleryComponent {}
