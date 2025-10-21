import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchPrintLabelsComponent } from './batch-print-labels.component';

describe('BatchPrintLabelsComponent', () => {
  let component: BatchPrintLabelsComponent;
  let fixture: ComponentFixture<BatchPrintLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchPrintLabelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchPrintLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
