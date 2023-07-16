import { TestBed } from '@angular/core/testing';

import { FinancialRecordService } from './financial-record.service';

describe('FinancialRecordService', () => {
  let service: FinancialRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
