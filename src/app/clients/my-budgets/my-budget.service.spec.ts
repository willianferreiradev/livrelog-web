import { TestBed } from '@angular/core/testing';

import { MyBudgetService } from './my-budget.service';

describe('MyBudgetService', () => {
  let service: MyBudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyBudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
