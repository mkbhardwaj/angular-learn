import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopingeditComponent } from './shopingedit.component';

describe('ShopingeditComponent', () => {
  let component: ShopingeditComponent;
  let fixture: ComponentFixture<ShopingeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopingeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopingeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
