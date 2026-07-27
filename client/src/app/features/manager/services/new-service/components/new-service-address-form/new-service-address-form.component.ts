import { Component, inject, input, output, signal } from '@angular/core';
import {
  CityModel,
  CountryModel,
  StateModel,
} from '@core/models/country.model';
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
  private readonly _country = signal<string>('');
  private readonly _fb = inject(FormBuilder);
  readonly countries = input.required<CountryModel[]>();
  readonly states = input.required<StateModel[]>();
  readonly cities = input.required<CityModel[]>();
  readonly onSelectCountry = output<string>();
  readonly onSelectState = output<{ country: string; state: string }>();

  readonly form: FormGroup = this._fb.group({
    country: ['', Validators.required],
    state: ['', Validators.required],
    city: ['', Validators.required],
    address1: ['', Validators.required],
    address2: [''],
  });

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
