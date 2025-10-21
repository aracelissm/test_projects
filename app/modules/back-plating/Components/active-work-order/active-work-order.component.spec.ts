import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveWorkOrderComponent } from './active-work-order.component';

describe('ActiveWorkOrderComponent', () => {
  let component: ActiveWorkOrderComponent;
  let fixture: ComponentFixture<ActiveWorkOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveWorkOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
