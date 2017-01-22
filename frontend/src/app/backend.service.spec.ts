/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { BackendService } from './backend.service';
import { HttpModule } from '@angular/http'

describe('BackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [BackendService]
    });
  });

  it('should inject the BackendService', inject([BackendService], (service: BackendService) => {
    expect(service).toBeTruthy();
  }));
  it('should make a GET request', inject([BackendService],
    async((service: BackendService) => {
      service.test()
      tick()
      expect(service.author).toBeTruthy()
    })))


});
