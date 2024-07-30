import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrisonCardComponent } from './prison-card.component';

describe('PrisonCardComponent', () => {
  let component: PrisonCardComponent;
  let fixture: ComponentFixture<PrisonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrisonCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrisonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
