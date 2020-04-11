import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingsComponent } from './shoppings.component';

describe('ShoppingsComponent', () => {
  let component: ShoppingsComponent;
  let fixture: ComponentFixture<ShoppingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
