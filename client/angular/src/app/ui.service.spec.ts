/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UIService } from './ui.service';

describe('UIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UIService]
    });
  });

  it('should ...', inject([UIService], (service: UIService) => {
    expect(service).toBeTruthy();
  }));
});
