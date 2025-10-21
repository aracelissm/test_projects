import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BatchingStep } from 'src/app/models/batching-step';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { BatchingPanelsWizardService } from 'src/app/services/batching-panels-wizard.service';

import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import {  RouterModule } from '@angular/router';

import { DevExtremeModule } from 'devextreme-angular';
import { ValidationStatus } from 'devextreme/common';
import {ColumnResizeMode} from 'devextreme/common/grids';
import { MaterialModule } from 'src/app/modules/shared/modules/material.module';

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule,SharedModule,MaterialModule,DevExtremeModule],
    selector: 'app-base-wizard-step',
    templateUrl: './base-wizard-step.component.html',
    styleUrls: ['./base-wizard-step.component.scss']
})
export abstract class BaseWizardStepComponent implements OnInit {
    jobKey!: string;
    stepOrder!: number;
    currentStep: BatchingStep = {
        jobKey: '',
        previousButtonText: 'Prev',
        nextButtonText: 'Next',
        isComplete: false,
        stepName: '',
        stepComponent: '',
        isLastStep: false,
        stepOrder: 0
    };
    isComplete: boolean = false;

    constructor(
        public sharedService: SharedService,
        public router: Router,
        public route: ActivatedRoute,
        public batchingPanelWizardService: BatchingPanelsWizardService,
        public toastr: ToastrService,
        public formBuilder: UntypedFormBuilder
    ) {}

    ngOnInit(): void {
        this.stepOrder = this.route.snapshot.params['stepOrder'];
        this.jobKey = this.route.snapshot.params['jobKey'];
        this.stepOrder++;
        this.onInit();
    }

    onInit(): void {
        // Base onInit override for hooking up
    }

    next() {
        const route = this.batchingPanelWizardService.getNextBatchingStep(
            this.stepOrder,
            this.jobKey
        );
        console.log(route);
        this.router.navigateByUrl(route);
    }

    previous() {
        this.stepOrder -= 2;
        const route = this.batchingPanelWizardService.getPrevBatchingStep(
            this.stepOrder,
            this.jobKey
        );
        //console.log(this.stepOrder);
        //console.log('previous route: ' + route);
        this.router.navigateByUrl(route);
    }

    // completeStep() {
    //     this.batchingPanelWizardService
    //         .completeStep(this.jobKey, this.stepOrder)
    //         .subscribe({
    //             next: (res) => {
    //                 if (res && res.success && res.data) {
    //                     this.currentStep = res.data;
    //                 }
    //             }
    //         });
    // }

    // completeBatching() {
    //     this.batchingPanelWizardService.completeBatching(this.jobKey).subscribe({
    //         next: (res) => {
    //             if (res && res.success) {
    //                 this.router.navigate(['/batching-wizard/done']);
    //             }
    //         },
    //         error: (err) => {
    //             this.toastr.error(err.error.message);
    //         }
    //     });
    // }

    // resetCompleteStatus() {
    //     this.batchingPanelWizardService
    //         .resetCompleteStatus(this.jobKey, this.stepOrder)
    //         .subscribe({
    //             next: (res) => {
    //                 if (res && res.success && res.data) {
    //                     this.currentStep = res.data;
    //                 }
    //             }
    //         });
    // }
}
