import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBatchMarkComponent } from './assign-batch-mark.component';

describe('AssignBatchMarkComponent', () => {
  let component: AssignBatchMarkComponent;
  let fixture: ComponentFixture<AssignBatchMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignBatchMarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignBatchMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
