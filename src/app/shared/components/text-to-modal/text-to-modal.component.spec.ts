import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextToModalComponent } from './text-to-modal.component';

describe('TextToModalComponent', () => {
  let component: TextToModalComponent;
  let fixture: ComponentFixture<TextToModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextToModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextToModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
