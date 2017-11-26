import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypificationComponent } from './typification.component';

describe('TypificationComponent', () => {
  let component: TypificationComponent;
  let fixture: ComponentFixture<TypificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
