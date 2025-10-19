import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { DescriptionComponent } from './components/description/description.component';
import { AboutProviderComponent } from './components/about-provider/about-provider.component';
import { DivisorComponent } from '@components/divisor/divisor.component';
import { ValorationComponent } from './components/valoration/valoration.component';

@Component({
  selector: 'app-service',
  imports: [
    HeaderComponent,
    DescriptionComponent,
    AboutProviderComponent,
    DivisorComponent,
    ValorationComponent,
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
})
export default class ServiceComponent {}
