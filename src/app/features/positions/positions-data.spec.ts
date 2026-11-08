import { TestBed } from '@angular/core/testing';
import { PositionsData } from './positions-data';

describe('PositionsData', () => {
  let service: PositionsData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositionsData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
