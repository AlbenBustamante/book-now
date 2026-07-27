import { Component, inject, input, output } from '@angular/core';
import { CountryModel, StateModel } from '@core/models/country.model';
import { NewServiceCardComponent } from '../new-service-card/new-service-card.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-service-address-form',
  imports: [NewServiceCardComponent, ReactiveFormsModule],
  templateUrl: './new-service-address-form.component.html',
  styleUrl: './new-service-address-form.component.css',
})
export class NewServiceAddressFormComponent {
  private readonly _fb = inject(FormBuilder);
  readonly countries = input.required<CountryModel[]>();
  readonly states = input.required<StateModel[]>();
  readonly onSelectCountry = output<string>();

  readonly form: FormGroup = this._fb.group({
    country: ['', Validators.required],
    state: ['', Validators.required],
    address1: ['', Validators.required],
    address2: [''],
  });

  setCountry(event: Event) {
    this.form.patchValue({
      state: '',
    });

    const target = event.target as HTMLSelectElement;
    const value = target.value as string;

    const country = this.countries().filter(
      (country) => country.name === value,
    )[0];

    this.onSelectCountry.emit(country.iso2);
  }
}
