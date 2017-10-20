import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnitestComponent } from './anitest.component';

describe('AnitestComponent', () => {
  let component: AnitestComponent;
  let fixture: ComponentFixture<AnitestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnitestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnitestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
