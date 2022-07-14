import { TestBed } from '@angular/core/testing';

import { ProvidersService } from './providers.service';
import { environment } from './../../environments/environment';

describe('ProvidersService', () => {
  let service: ProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvidersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
