import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackPlatingComponent } from './back-plating.component';

describe('BackPlatingComponent', () => {
  let component: BackPlatingComponent;
  let fixture: ComponentFixture<BackPlatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackPlatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackPlatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
