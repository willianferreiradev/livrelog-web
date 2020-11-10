import { TestBed } from '@angular/core/testing';

import { BreadcumpService } from './breadcump.service';

describe('BreadcumpService', () => {
  let service: BreadcumpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreadcumpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
