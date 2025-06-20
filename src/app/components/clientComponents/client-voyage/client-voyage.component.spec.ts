import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVoyageComponent } from './client-voyage.component';

describe('ClientVoyageComponent', () => {
  let component: ClientVoyageComponent;
  let fixture: ComponentFixture<ClientVoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientVoyageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientVoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
