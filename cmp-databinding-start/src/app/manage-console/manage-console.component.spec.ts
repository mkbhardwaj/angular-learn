import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConsoleComponent } from './manage-console.component';

describe('ManageConsoleComponent', () => {
  let component: ManageConsoleComponent;
  let fixture: ComponentFixture<ManageConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
