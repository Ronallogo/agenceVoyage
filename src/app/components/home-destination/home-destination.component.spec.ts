import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDestinationComponent } from './home-destination.component';

describe('HomeDestinationComponent', () => {
  let component: HomeDestinationComponent;
  let fixture: ComponentFixture<HomeDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDestinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
