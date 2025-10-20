import { Component } from '@angular/core';
import { ContainerComponent } from '@components/container/container.component';
import { TitleComponent } from '@components/title/title.component';

@Component({
  selector: 'app-details',
  imports: [ContainerComponent, TitleComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export default class DetailsComponent {}
