import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServiceCardComponent } from './new-service-card.component';

describe('NewServiceCardComponent', () => {
  let component: NewServiceCardComponent;
  let fixture: ComponentFixture<NewServiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewServiceCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewServiceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
