import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayConsoleComponent } from './display-console.component';

describe('DisplayConsoleComponent', () => {
  let component: DisplayConsoleComponent;
  let fixture: ComponentFixture<DisplayConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
