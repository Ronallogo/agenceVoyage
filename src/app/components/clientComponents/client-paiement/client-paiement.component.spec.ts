import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPaiementComponent } from './client-paiement.component';

describe('ClientPaiementComponent', () => {
  let component: ClientPaiementComponent;
  let fixture: ComponentFixture<ClientPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPaiementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
