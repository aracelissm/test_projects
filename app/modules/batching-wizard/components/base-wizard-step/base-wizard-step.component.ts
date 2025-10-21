import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BatchingStep } from 'src/app/models/batching-step';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { BatchingWizardService } from 'src/app/services/batching-wizard.service';

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
    public batchingWizardService: BatchingWizardService,
    public toastr: ToastrService,
    public formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.stepOrder = this.route.snapshot.params['stepOrder'];
    this.jobKey = this.route.snapshot.params['jobKey'];

    this.batchingWizardService.getBatchingStep(this.jobKey, this.stepOrder).subscribe({
      next: (res) => {
        if (res && res.success && res.data) {
          this.currentStep = res.data;
        }
      }
    });

    this.onInit();
  }


  onInit(): void {
    // Base onInit override for hooking up
  }

  next() {
    this.completeStep();
    this.batchingWizardService.getNextBatchingStep(this.jobKey, this.stepOrder).subscribe({
      next: (res) => {
        if (res && res.success) {
          const route = this.batchingWizardService.getComponentRoute(res.data);
          console.log("I am here");
          console.log(route);
          this.router.navigateByUrl(route);
        }
      }
    });
  }

  previous() {
    this.batchingWizardService.getPrevBatchingStep(this.jobKey, this.stepOrder).subscribe({
      next: (res) => {
        if (res && res.success) {
          const route = this.batchingWizardService.getComponentRoute(res.data);
          this.router.navigateByUrl(route);
        }
      }
    });
  }

  completeStep() {
    this.batchingWizardService.completeStep(this.jobKey, this.stepOrder).subscribe({
      next: (res) => {
        if (res && res.success && res.data) {
          this.currentStep = res.data;
        }
      }
    });
  }

  completeBatching() {
    this.batchingWizardService.completeBatching(this.jobKey).subscribe({
      next: (res) => {
        if (res && res.success) {
          this.router.navigate(['/batching-wizard/done']);
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      }
    });
  }

  resetCompleteStatus() {
    this.batchingWizardService.resetCompleteStatus(this.jobKey, this.stepOrder).subscribe({
      next: (res) => {
        if (res && res.success && res.data) {
          this.currentStep = res.data;
        }
      }
    });
  }

}
