import { Component } from '@angular/core';
import { InputComponent } from '@components/input/input.component';

@Component({
  selector: 'app-customers-search',
  imports: [InputComponent],
  templateUrl: './customers-search.component.html',
  styleUrl: './customers-search.component.css',
})
export class CustomersSearchComponent {}
