import { Component, inject, signal } from '@angular/core';
import { NewServiceCardComponent } from '../new-service-card/new-service-card.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@components/input/input.component';
import { NewServiceStore } from '../../new-service.store';
import { NewAddressModel } from '../../new-service.model';

@Component({
  selector: 'app-new-service-address-form',
  imports: [NewServiceCardComponent, ReactiveFormsModule, InputComponent],
  templateUrl: './new-service-address-form.component.html',
  styleUrl: './new-service-address-form.component.css',
})
export class NewServiceAddressFormComponent {
  private readonly _country = signal<string>('');
  private readonly _fb = inject(FormBuilder);
  readonly store = inject(NewServiceStore);
  readonly newAddress = signal<boolean>(true);

  readonly form = this._fb.group({
    country: ['', Validators.required],
    state: ['', Validators.required],
    city: ['', Validators.required],
    street: ['', Validators.required],
    zipCode: [''],
  });

  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      if (this.form.valid) {
        this.store.setServiceAddress(value as NewAddressModel);
      }
    });
  }

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

    const country = this.store
      .countries()
      .filter((country) => country.name === value)[0];

    this._country.set(country.iso2);
    this.store.fetchStatesByCountry(this._country());
  }

  setState(event: Event) {
    this.form.patchValue({
      city: '',
    });

    const target = event.target as HTMLSelectElement;
    const value = target.value as string;

    const state = this.store
      .states()
      .filter((state) => state.name === value)[0];

    this.store.fetchCitiesByState(this._country(), state.iso2);
  }
}
