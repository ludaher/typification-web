import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypifyComponent } from './typify.component';

describe('TypifyComponent', () => {
  let component: TypifyComponent;
  let fixture: ComponentFixture<TypifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
