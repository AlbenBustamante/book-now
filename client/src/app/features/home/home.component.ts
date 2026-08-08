import { Component, inject } from '@angular/core';
import { ProviderCardComponent } from './components/provider-card/provider-card.component';
import { ServicesCarouselComponent } from '@components/services-carousel/services-carousel.component';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from '@components/container/container.component';
import { SectionContainerComponent } from '@components/section-container/section-container.component';
import { HomeStore } from './home.store';

@Component({
  selector: 'app-home',
  imports: [
    ProviderCardComponent,
    ServicesCarouselComponent,
    HeaderComponent,
    ContainerComponent,
    SectionContainerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [HomeStore],
})
export default class HomeComponent {
  readonly store = inject(HomeStore);

  ngOnInit() {
    this.store.fetchHome();
  }
}
