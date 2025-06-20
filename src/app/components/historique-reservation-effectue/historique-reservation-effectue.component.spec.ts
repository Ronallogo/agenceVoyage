import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueReservationEffectueComponent } from './historique-reservation-effectue.component';

describe('HistoriqueReservationEffectueComponent', () => {
  let component: HistoriqueReservationEffectueComponent;
  let fixture: ComponentFixture<HistoriqueReservationEffectueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueReservationEffectueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueReservationEffectueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
