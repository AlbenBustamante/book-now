import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerServicePaginationComponent } from './manager-service-pagination.component';

describe('ManagerServicePaginationComponent', () => {
  let component: ManagerServicePaginationComponent;
  let fixture: ComponentFixture<ManagerServicePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerServicePaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerServicePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
