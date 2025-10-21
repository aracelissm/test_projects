import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidAuditTrailComponent } from './bid-audit-trail.component';

describe('BidAuditTrailComponent', () => {
  let component: BidAuditTrailComponent;
  let fixture: ComponentFixture<BidAuditTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidAuditTrailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
