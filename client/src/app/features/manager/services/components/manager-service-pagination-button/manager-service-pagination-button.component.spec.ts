import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerServicePaginationButtonComponent } from './manager-service-pagination-button.component';

describe('ManagerServicePaginationButtonComponent', () => {
  let component: ManagerServicePaginationButtonComponent;
  let fixture: ComponentFixture<ManagerServicePaginationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerServicePaginationButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerServicePaginationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
