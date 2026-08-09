import { Component, inject, input } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { DescriptionComponent } from './components/description/description.component';
import { AboutProviderComponent } from './components/about-provider/about-provider.component';
import { DivisorComponent } from '@components/divisor/divisor.component';
import { ContainerComponent } from '@components/container/container.component';
import { ReviewsComponent } from '@components/reviews/reviews.component';
import { ServiceStore } from './service.store';

@Component({
  selector: 'app-service',
  imports: [
    HeaderComponent,
    DescriptionComponent,
    AboutProviderComponent,
    DivisorComponent,
    ContainerComponent,
    ReviewsComponent,
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
  providers: [ServiceStore],
})
export default class ServiceComponent {
  readonly store = inject(ServiceStore);
  readonly id = input.required<string>();

  ngOnInit() {
    this.store.fetchDetails(this.id());
  }
}
