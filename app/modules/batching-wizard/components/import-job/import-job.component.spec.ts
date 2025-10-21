import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportJobComponent } from './import-job.component';

describe('ImportJobComponent', () => {
  let component: ImportJobComponent;
  let fixture: ComponentFixture<ImportJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
