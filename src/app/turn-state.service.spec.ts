import { TestBed } from '@angular/core/testing';

import { TurnStateService } from './turn-state.service';

describe('TurnStateService', () => {
  let service: TurnStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
