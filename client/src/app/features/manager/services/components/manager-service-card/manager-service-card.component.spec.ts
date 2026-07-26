import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerServiceCardComponent } from './manager-service-card.component';

describe('ManagerServiceCardComponent', () => {
  let component: ManagerServiceCardComponent;
  let fixture: ComponentFixture<ManagerServiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerServiceCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerServiceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
