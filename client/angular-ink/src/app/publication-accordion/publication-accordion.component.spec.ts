import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationAccordionComponent } from './publication-accordion.component';

describe('PublicationAccordionComponent', () => {
  let component: PublicationAccordionComponent;
  let fixture: ComponentFixture<PublicationAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
