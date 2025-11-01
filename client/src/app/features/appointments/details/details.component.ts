import { Component, inject } from '@angular/core';
import { ContainerComponent } from '@components/container/container.component';
import { SectionContainerComponent } from '@components/section-container/section-container.component';
import { ItemComponent } from './components/item/item.component';
import { ButtonComponent } from '@components/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [
    ContainerComponent,
    SectionContainerComponent,
    ItemComponent,
    ButtonComponent,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export default class DetailsComponent {
  private readonly _router = inject(Router);

  readonly date = new Date();

  goToOverview() {
    this._router.navigateByUrl('/appointments/overview');
  }
}
