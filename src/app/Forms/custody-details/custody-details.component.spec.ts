import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustodyDetailsComponent } from './custody-details.component';

describe('CustodyDetailsComponent', () => {
  let component: CustodyDetailsComponent;
  let fixture: ComponentFixture<CustodyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustodyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustodyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
