import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperTreeComponent } from './paper-tree.component';

describe('PaperTreeComponent', () => {
  let component: PaperTreeComponent;
  let fixture: ComponentFixture<PaperTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
