import { TestBed } from '@angular/core/testing';

import { PlanesService } from './planes.service';

describe('PlanesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlanesService = TestBed.get(PlanesService);
    expect(service).toBeTruthy();
  });
});
