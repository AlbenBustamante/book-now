import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerStatCardComponent } from './customer-stat-card.component';

describe('CustomerStatCardComponent', () => {
  let component: CustomerStatCardComponent;
  let fixture: ComponentFixture<CustomerStatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerStatCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerStatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
