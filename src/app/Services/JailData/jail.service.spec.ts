import { TestBed } from '@angular/core/testing';

import { JailService } from './jail.service';

describe('JailService', () => {
  let service: JailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
