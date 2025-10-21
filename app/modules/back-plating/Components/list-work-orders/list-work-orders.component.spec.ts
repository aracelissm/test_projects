import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkOrdersComponent } from './list-work-orders.component';

describe('ListWorkOrdersComponent', () => {
  let component: ListWorkOrdersComponent;
  let fixture: ComponentFixture<ListWorkOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWorkOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWorkOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
