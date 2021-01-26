import { TestBed } from '@angular/core/testing';

import { MyChangeService } from './my-change.service';

describe('MyChangeService', () => {
  let service: MyChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
