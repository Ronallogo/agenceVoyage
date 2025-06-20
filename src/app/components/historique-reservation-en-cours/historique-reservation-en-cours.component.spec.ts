import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueReservationEnCoursComponent } from './historique-reservation-en-cours.component';

describe('HistoriqueReservationEnCoursComponent', () => {
  let component: HistoriqueReservationEnCoursComponent;
  let fixture: ComponentFixture<HistoriqueReservationEnCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueReservationEnCoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueReservationEnCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
