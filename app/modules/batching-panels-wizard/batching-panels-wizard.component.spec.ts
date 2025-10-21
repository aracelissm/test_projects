import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchingPanelsWizardComponent } from './batching-panels-wizard.component';

describe('BatchingPanelsWizardComponent', () => {
    let component: BatchingPanelsWizardComponent;
    let fixture: ComponentFixture<BatchingPanelsWizardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BatchingPanelsWizardComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BatchingPanelsWizardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
