import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfNavigatorComponent } from './pdf-navigator.component';

describe('PdfNavigatorComponent', () => {
  let component: PdfNavigatorComponent;
  let fixture: ComponentFixture<PdfNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
