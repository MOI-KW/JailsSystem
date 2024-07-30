import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JailDetailsComponent } from './jail-details.component';

describe('JailDetailsComponent', () => {
  let component: JailDetailsComponent;
  let fixture: ComponentFixture<JailDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JailDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JailDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
