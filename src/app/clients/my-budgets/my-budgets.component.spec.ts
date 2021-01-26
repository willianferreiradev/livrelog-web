import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBudgetsComponent } from './my-budgets.component';

describe('MyBudgetsComponent', () => {
  let component: MyBudgetsComponent;
  let fixture: ComponentFixture<MyBudgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBudgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
