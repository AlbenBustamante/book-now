import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@components/footer/footer.component';

@Component({
  selector: 'app-auth',
  imports: [FooterComponent, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export default class AuthComponent {}
