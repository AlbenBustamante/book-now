import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServiceAddressFormComponent } from './new-service-address-form.component';

describe('NewServiceAddressFormComponent', () => {
  let component: NewServiceAddressFormComponent;
  let fixture: ComponentFixture<NewServiceAddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewServiceAddressFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewServiceAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
