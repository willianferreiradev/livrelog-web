import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChangesComponent } from './my-changes.component';

describe('MyChangesComponent', () => {
  let component: MyChangesComponent;
  let fixture: ComponentFixture<MyChangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyChangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
