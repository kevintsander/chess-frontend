import { TestBed } from '@angular/core/testing';

import { ActioncableService } from './actioncable.service';

describe('ActioncableService', () => {
  let service: ActioncableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActioncableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
