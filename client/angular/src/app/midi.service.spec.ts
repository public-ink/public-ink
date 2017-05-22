import { TestBed, inject } from '@angular/core/testing';

import { MIDIService } from './midi.service';

describe('MIDIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MIDIService]
    });
  });

  it('should ...', inject([MIDIService], (service: MIDIService) => {
    expect(service).toBeTruthy();
  }));
});
