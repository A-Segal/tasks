import { TestBed } from '@angular/core/testing';

import { HttpServiceBaseService } from './http-service.base.service';

describe('HttpServiceBaseService', () => {
  let service: HttpServiceBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpServiceBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
