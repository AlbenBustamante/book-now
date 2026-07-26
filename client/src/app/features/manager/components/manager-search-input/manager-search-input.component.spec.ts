import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSearchInputComponent } from './manager-search-input.component.js';

describe('CustomersSearchComponent', () => {
  let component: ManagerSearchInputComponent;
  let fixture: ComponentFixture<ManagerSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerSearchInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
