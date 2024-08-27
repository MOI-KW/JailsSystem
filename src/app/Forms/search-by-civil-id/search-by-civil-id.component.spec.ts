import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByCivilIDComponent } from './search-by-civil-id.component';

describe('SearchByCivilIDComponent', () => {
  let component: SearchByCivilIDComponent;
  let fixture: ComponentFixture<SearchByCivilIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByCivilIDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByCivilIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
