import { Component, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { DescriptionComponent } from './components/description/description.component';
import { AboutProviderComponent } from './components/about-provider/about-provider.component';
import { DivisorComponent } from '@components/divisor/divisor.component';
import { ContainerComponent } from '@components/container/container.component';
import { ReviewsComponent } from '@components/reviews/reviews.component';
import { ButtonComponent } from '@components/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service',
  imports: [
    HeaderComponent,
    DescriptionComponent,
    AboutProviderComponent,
    DivisorComponent,
    ContainerComponent,
    ReviewsComponent,
    ButtonComponent,
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
})
export default class ServiceComponent {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  goToAppointment() {
    this._router.navigate(['appointment'], { relativeTo: this._route });
  }
}
