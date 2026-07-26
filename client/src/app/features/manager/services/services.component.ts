import { Component } from '@angular/core';
import { ManagerHeaderComponent } from '../components/manager-header/manager-header.component';
import { ManagerSearchInputComponent } from '../components/manager-search-input/manager-search-input.component';
import { ButtonComponent } from '@components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [
    ManagerHeaderComponent,
    ManagerSearchInputComponent,
    ButtonComponent,
    RouterLink,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export default class ServicesComponent {}
