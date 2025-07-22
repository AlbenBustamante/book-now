import { Component } from '@angular/core';
import { CustomInputComponent } from '../../../components/custom-input/custom-input.component';
import { CustomButtonComponent } from '../../../components/custom-button/custom-button.component';

@Component({
  selector: 'app-sign-up',
  imports: [CustomInputComponent, CustomButtonComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export default class SignUpComponent {}
