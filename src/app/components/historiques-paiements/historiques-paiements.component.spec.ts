import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquesPaiementsComponent } from './historiques-paiements.component';

describe('HistoriquesPaiementsComponent', () => {
  let component: HistoriquesPaiementsComponent;
  let fixture: ComponentFixture<HistoriquesPaiementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriquesPaiementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriquesPaiementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
