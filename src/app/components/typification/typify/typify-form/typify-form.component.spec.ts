import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypifyFormComponent } from './typify-form.component';

describe('TypifyFormComponent', () => {
  let component: TypifyFormComponent;
  let fixture: ComponentFixture<TypifyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypifyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypifyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
