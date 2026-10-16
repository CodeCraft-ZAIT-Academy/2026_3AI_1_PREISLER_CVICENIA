import { TestBed } from '@angular/core/testing';
import { BookFactory } from './book.factory';

describe('BookFactory', () => {
  let service: BookFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
