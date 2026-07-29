import { Component, inject } from '@angular/core';
import { InputComponent } from '@components/input/input.component';
import { TextAreaComponent } from '@components/text-area/text-area.component';
import { NewServiceCardComponent } from '../new-service-card/new-service-card.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewServiceStore } from '../../new-service.store';
import { NewServiceModel } from '../../new-service.model';

@Component({
  selector: 'app-new-service-info-form',
  imports: [
    InputComponent,
    TextAreaComponent,
    NewServiceCardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './new-service-info-form.component.html',
  styleUrl: './new-service-info-form.component.css',
})
export class NewServiceInfoFormComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _store = inject(NewServiceStore);

  readonly form = this._fb.group({
    name: ['', Validators.required],
    durationInMinutes: ['', [Validators.required, Validators.min(30)]],
    price: ['', [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required, Validators.maxLength(620)]],
  });

  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      this._store.setServiceInfo(
        value as unknown as NewServiceModel,
        this.form.valid,
      );
    });
  }
}
