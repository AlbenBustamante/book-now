import { Component } from '@angular/core';
import { ContainerComponent } from '@components/container/container.component';

@Component({
  selector: 'app-details',
  imports: [ContainerComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export default class DetailsComponent {}
