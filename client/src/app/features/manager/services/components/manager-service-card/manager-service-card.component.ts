import { Component, input } from '@angular/core';
import { CardComponent } from '@components/card/card.component';
import { DivisorComponent } from '@components/divisor/divisor.component';
import { ButtonComponent } from '@components/button/button.component';
import { ServiceModel } from '@core/models/service.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-manager-service-card',
  imports: [CardComponent, DivisorComponent, ButtonComponent, CurrencyPipe],
  templateUrl: './manager-service-card.component.html',
  styleUrl: './manager-service-card.component.css',
})
export class ManagerServiceCardComponent {
  readonly service = input.required<ServiceModel>();
}
