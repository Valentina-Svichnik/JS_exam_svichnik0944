import { TestBed } from '@angular/core/testing';

import { MproductService } from './mproduct.service';

describe('MproductService', () => {
  let service: MproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
