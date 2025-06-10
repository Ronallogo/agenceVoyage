import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentGeneralViewsComponent } from './content-general-views.component';

describe('ContentGeneralViewsComponent', () => {
  let component: ContentGeneralViewsComponent;
  let fixture: ComponentFixture<ContentGeneralViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentGeneralViewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentGeneralViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
