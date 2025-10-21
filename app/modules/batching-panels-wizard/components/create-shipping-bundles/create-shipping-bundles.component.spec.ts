import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShippingBundlesComponent } from './create-shipping-bundles.component';

describe('CreateShippingBundlesComponent', () => {
  let component: CreateShippingBundlesComponent;
  let fixture: ComponentFixture<CreateShippingBundlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateShippingBundlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShippingBundlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
