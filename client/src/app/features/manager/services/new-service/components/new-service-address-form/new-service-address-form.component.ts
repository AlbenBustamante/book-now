import { Component, inject, input, output, signal } from '@angular/core';
import {
  CityModel,
  CountryModel,
  StateModel,
} from '@core/models/country.model';
import { NewServiceCardComponent } from '../new-service-card/new-service-card.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@components/input/input.component';

@Component({
  selector: 'app-new-service-address-form',
  imports: [NewServiceCardComponent, ReactiveFormsModule, InputComponent],
  templateUrl: './new-service-address-form.component.html',
  styleUrl: './new-service-address-form.component.css',
})
export class NewServiceAddressFormComponent {
  private readonly _country = signal<string>('');
  private readonly _fb = inject(FormBuilder);
  readonly countries = input.required<CountryModel[]>();
  readonly states = input.required<StateModel[]>();
  readonly cities = input.required<CityModel[]>();
  readonly onSelectCountry = output<string>();
  readonly onSelectState = output<{ country: string; state: string }>();
  readonly newAddress = signal<boolean>(true);

  readonly form = this._fb.group({
    country: ['', Validators.required],
    state: ['', Validators.required],
    city: ['', Validators.required],
    street: ['', Validators.required],
    zipCode: [''],
  });

  setNewAddress(newAddress: boolean) {
    this.newAddress.set(newAddress);
  }

  setCountry(event: Event) {
    this.form.patchValue({
      state: '',
      city: '',
    });

    const target = event.target as HTMLSelectElement;
    const value = target.value as string;

    const country = this.countries().filter(
      (country) => country.name === value,
    )[0];

    this._country.set(country.iso2);
    this.onSelectCountry.emit(this._country());
  }

  setState(event: Event) {
    this.form.patchValue({
      city: '',
    });

    const target = event.target as HTMLSelectElement;
    const value = target.value as string;

    const state = this.states().filter((state) => state.name === value)[0];

    this.onSelectState.emit({
      country: this._country(),
      state: state.iso2,
    });
  }
}
