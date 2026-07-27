import { Component } from '@angular/core';
import { CardComponent } from '@components/card/card.component';
import { InputComponent } from '@components/input/input.component';
import { TextAreaComponent } from '@components/text-area/text-area.component';

@Component({
  selector: 'app-new-service-info-form',
  imports: [CardComponent, InputComponent, TextAreaComponent],
  templateUrl: './new-service-info-form.component.html',
  styleUrl: './new-service-info-form.component.css',
})
export class NewServiceInfoFormComponent {}
