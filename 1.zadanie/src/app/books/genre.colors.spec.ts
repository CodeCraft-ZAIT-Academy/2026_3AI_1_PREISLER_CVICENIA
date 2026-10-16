import { TestBed } from '@angular/core/testing';
import { GenreColors } from './genre.colors';

describe('GenreColors', () => {
  let service: GenreColors;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenreColors);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
