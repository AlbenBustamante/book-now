import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServiceGalleryComponent } from './new-service-gallery.component';

describe('NewServiceGalleryComponent', () => {
  let component: NewServiceGalleryComponent;
  let fixture: ComponentFixture<NewServiceGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewServiceGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewServiceGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
