import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerStatsGridComponent } from './customer-stats-grid.component';

describe('CustomerStatsGridComponent', () => {
  let component: CustomerStatsGridComponent;
  let fixture: ComponentFixture<CustomerStatsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerStatsGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerStatsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
