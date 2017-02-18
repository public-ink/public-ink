/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MePageComponent } from './me-page.component';

describe('MePageComponent', () => {
  let component: MePageComponent;
  let fixture: ComponentFixture<MePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
