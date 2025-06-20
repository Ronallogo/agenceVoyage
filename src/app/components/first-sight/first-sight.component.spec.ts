import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstSightComponent } from './first-sight.component';

describe('FirstSightComponent', () => {
  let component: FirstSightComponent;
  let fixture: ComponentFixture<FirstSightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstSightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstSightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
