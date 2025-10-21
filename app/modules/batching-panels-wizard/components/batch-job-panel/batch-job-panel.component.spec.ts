import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchJobPanelComponent } from './batch-job-panel.component';

describe('BatchJobPanelComponent', () => {
  let component: BatchJobPanelComponent;
  let fixture: ComponentFixture<BatchJobPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchJobPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchJobPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
