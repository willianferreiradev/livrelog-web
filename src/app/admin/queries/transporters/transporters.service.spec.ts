import { TestBed } from '@angular/core/testing';

import { TransportersService } from './transporters.service';

describe('TransportersService', () => {
  let service: TransportersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
