import { Component } from '@angular/core';
import { NewServiceCardComponent } from '../new-service-card/new-service-card.component';
import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'app-new-service-confirm-button',
  imports: [NewServiceCardComponent, ButtonComponent],
  templateUrl: './new-service-confirm-button.component.html',
  styleUrl: './new-service-confirm-button.component.css',
})
export class NewServiceConfirmButtonComponent {}
