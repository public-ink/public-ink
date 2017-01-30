/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MediaBarComponent } from './media-bar.component';

describe('MediaBarComponent', () => {
  let component: MediaBarComponent;
  let fixture: ComponentFixture<MediaBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
