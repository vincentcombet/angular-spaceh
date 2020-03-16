import { TestBed } from '@angular/core/testing';

import { MathsServiceService } from './maths-service.service';

describe('MathsServiceService', () => {
  let service: MathsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
