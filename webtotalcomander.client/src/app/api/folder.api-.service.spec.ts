import { TestBed } from '@angular/core/testing';

import { FolderApiService } from './folder.api-.service';

describe('FolderApiService', () => {
  let service: FolderApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
