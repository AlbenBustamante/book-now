import { Component } from '@angular/core';
import { InputComponent } from '@components/input/input.component';
import { TextAreaComponent } from '@components/text-area/text-area.component';
import { NewServiceCardComponent } from '../new-service-card/new-service-card.component';

@Component({
  selector: 'app-new-service-info-form',
  imports: [InputComponent, TextAreaComponent, NewServiceCardComponent],
  templateUrl: './new-service-info-form.component.html',
  styleUrl: './new-service-info-form.component.css',
})
export class NewServiceInfoFormComponent {}
