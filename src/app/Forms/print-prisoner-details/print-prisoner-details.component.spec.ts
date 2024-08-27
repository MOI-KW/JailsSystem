import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPrisonerDetailsComponent } from './print-prisoner-details.component';

describe('PrintPrisonerDetailsComponent', () => {
  let component: PrintPrisonerDetailsComponent;
  let fixture: ComponentFixture<PrintPrisonerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPrisonerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPrisonerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
