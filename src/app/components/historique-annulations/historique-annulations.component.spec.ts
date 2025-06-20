import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueAnnulationsComponent } from './historique-annulations.component';

describe('HistoriqueAnnulationsComponent', () => {
  let component: HistoriqueAnnulationsComponent;
  let fixture: ComponentFixture<HistoriqueAnnulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueAnnulationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueAnnulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
