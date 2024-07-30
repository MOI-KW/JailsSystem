import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrisonerDetailComponent } from './prisoner-detail.component';

describe('PrisonerDetailComponent', () => {
  let component: PrisonerDetailComponent;
  let fixture: ComponentFixture<PrisonerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrisonerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrisonerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
