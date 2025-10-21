import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchingWizardComponent } from './batching-wizard.component';

describe('BatchingWizardComponent', () => {
  let component: BatchingWizardComponent;
  let fixture: ComponentFixture<BatchingWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchingWizardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchingWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
