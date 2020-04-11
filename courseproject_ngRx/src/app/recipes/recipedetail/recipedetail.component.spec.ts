import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipedetailComponent } from './recipedetail.component';

describe('RecipedetailComponent', () => {
  let component: RecipedetailComponent;
  let fixture: ComponentFixture<RecipedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
