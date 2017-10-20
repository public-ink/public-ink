import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorAccordionComponent } from './author-accordion.component';

describe('AuthorAccordionComponent', () => {
  let component: AuthorAccordionComponent;
  let fixture: ComponentFixture<AuthorAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
