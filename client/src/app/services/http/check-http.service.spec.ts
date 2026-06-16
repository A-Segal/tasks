import { TestBed } from '@angular/core/testing';

import { CheckHttpService } from './check-http.service';

describe('CheckHttpService', () => {
  let service: CheckHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
