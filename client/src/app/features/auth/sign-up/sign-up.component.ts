import { Component } from '@angular/core';
import { InputComponent } from '@components/input/input.component';
import { ButtonComponent } from '@components/button/button.component';
import { RedirectComponent } from '../components/redirect/redirect.component';

@Component({
  selector: 'app-sign-up',
  imports: [InputComponent, ButtonComponent, RedirectComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export default class SignUpComponent {}
