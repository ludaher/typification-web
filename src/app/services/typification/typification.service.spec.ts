import { TestBed, inject } from '@angular/core/testing';

import { TypificationService } from './typification.service';

describe('TypificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypificationService]
    });
  });

  it('should be created', inject([TypificationService], (service: TypificationService) => {
    expect(service).toBeTruthy();
  }));
});
