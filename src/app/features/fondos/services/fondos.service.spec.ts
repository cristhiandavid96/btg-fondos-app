import { TestBed } from '@angular/core/testing';

import { Fondos } from './fondos.service';

describe('Fondos', () => {
  let service: Fondos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fondos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
