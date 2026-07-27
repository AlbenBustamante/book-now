import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServiceConfirmButtonComponent } from './new-service-confirm-button.component';

describe('NewServiceConfirmButtonComponent', () => {
  let component: NewServiceConfirmButtonComponent;
  let fixture: ComponentFixture<NewServiceConfirmButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewServiceConfirmButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewServiceConfirmButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
