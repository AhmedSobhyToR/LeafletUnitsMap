import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitListOverlayComponent } from './unit-list-overlay.component';

describe('UnitListOverlayComponent', () => {
  let component: UnitListOverlayComponent;
  let fixture: ComponentFixture<UnitListOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitListOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitListOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
