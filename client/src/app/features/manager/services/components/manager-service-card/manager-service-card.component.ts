import { Component } from '@angular/core';
import { CardComponent } from '@components/card/card.component';
import { DivisorComponent } from '@components/divisor/divisor.component';
import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'app-manager-service-card',
  imports: [CardComponent, DivisorComponent, ButtonComponent],
  templateUrl: './manager-service-card.component.html',
  styleUrl: './manager-service-card.component.css',
})
export class ManagerServiceCardComponent {}
