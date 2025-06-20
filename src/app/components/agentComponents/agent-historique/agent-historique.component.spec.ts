import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentHistoriqueComponent } from './agent-historique.component';

describe('AgentHistoriqueComponent', () => {
  let component: AgentHistoriqueComponent;
  let fixture: ComponentFixture<AgentHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentHistoriqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
