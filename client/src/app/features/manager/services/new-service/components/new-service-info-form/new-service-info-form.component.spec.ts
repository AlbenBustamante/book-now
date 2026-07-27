import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServiceInfoFormComponent } from './new-service-info-form.component';

describe('NewServiceInfoFormComponent', () => {
  let component: NewServiceInfoFormComponent;
  let fixture: ComponentFixture<NewServiceInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewServiceInfoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewServiceInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
