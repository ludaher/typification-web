import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProcessesComponent } from './user-processes.component';

describe('UserProcessesComponent', () => {
  let component: UserProcessesComponent;
  let fixture: ComponentFixture<UserProcessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProcessesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
