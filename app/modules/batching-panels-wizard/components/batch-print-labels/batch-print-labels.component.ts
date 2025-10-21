import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BatchingStep } from 'src/app/models/batching-step';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { BatchingPanelsWizardService } from 'src/app/services/batching-panels-wizard.service';
import { BaseWizardStepComponent } from '../base-wizard-step/base-wizard-step.component';
import { BatchJobService } from 'src/app/services/batch-job.service';
import { BatchPrintSummaryResponse } from 'src/app/models/batch-job.model';
import { BatchingReportType } from 'src/app/enums/batching-report-type';
import { BatchingReportService } from 'src/app/services/batching-report.service';
import { LaserCutReportRequest, ShopDrawingReportRequest } from 'src/app/models/batching-report.model';

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
    selector: 'app-batch-print-labels',
    templateUrl: './batch-print-labels.component.html',
    styleUrls: ['./batch-print-labels.component.scss']
})
export class BatchPrintLabelsComponent extends BaseWizardStepComponent implements OnInit {
    batchPrintSummary: BatchPrintSummaryResponse = {
        floorLabelCnt: 0,
        roofLabelCnt: 0,
        floorMarkAndCnt: [],
        roofMarkAndCnt: []
    };

    constructor(
        public sharedService2: SharedService,
        public router2: Router,
        public route2: ActivatedRoute,
        public batchingPanelsWizardService2: BatchingPanelsWizardService,
        public toastr2: ToastrService,
        public formBuilder2: UntypedFormBuilder,
        private batchingJobService: BatchJobService,
        private batchingReportService: BatchingReportService
    ) {
        super(
            sharedService2,
            router2,
            route2,
            batchingPanelsWizardService2,
            toastr2,
            formBuilder2
        );
    }

    override onInit(): void {
        console.log('BatchPrintLabelsComponent');

        this.batchingJobService.getBatchPrintSummary(this.jobKey).subscribe({
            next: (res) => {
                if (res.success && res.data) {
                    console.log(res.data);
                    this.batchPrintSummary = res.data;
                }
            }
        });
    }

    printRoofLabels() {
        this.batchingJobService.printRoofLabels(this.jobKey, '').subscribe({
            next: (res: any) => {
                this.downloadFile(`RoofTruss-${this.jobKey}.pdf`, res);
            }
        });
    }

    printFloorLabels() {
        this.batchingJobService.printFloorLabels(this.jobKey, false, '').subscribe({
            next: (res: any) => {
                this.downloadFile(`FloorTruss-${this.jobKey}.pdf`, res);
            }
        });
    }

    //TODO figure out how to get this to open in a new tab.
    downloadFile(fileName: string, res: any) {
        const fileUrl = URL.createObjectURL(res.body);
        window.open(fileUrl, '_blank');
    }

    onClickOpenLaserCutReport() {
        var request: LaserCutReportRequest = { jobItemRecIds: [], marks: []};
        this.batchingReportService.getLaserCutReport(this.jobKey, request).subscribe({
            next: (res: any) => {
                const fileName = res.headers
                    .get('content-disposition')
                    .split(';')[1]
                    .split('filename')[1]
                    .split('=')[1]
                    .trim();
                this.downloadFile(fileName, res);
            }
        });
    }

    onClickOpenShopDrawingReport() {
        var request: ShopDrawingReportRequest = { jobItemRecIds: [], marks: []};
        this.batchingReportService.getShopDrawingReport(this.jobKey,request).subscribe({
            next: (res: any) => {
                const fileName = res.headers
                    .get('content-disposition')
                    .split(';')[1]
                    .split('filename')[1]
                    .split('=')[1]
                    .trim();
                this.downloadFile(fileName, res);
            }
        });
    }

    onClickOpenBatchSummaryReport() {
        this.batchingReportService.getPanelBatchSummaryReport(this.jobKey).subscribe({
            next: (res: any) => {
                const fileName = res.headers
                    .get('content-disposition')
                    .split(';')[1]
                    .split('filename')[1]
                    .split('=')[1]
                    .trim();
                this.downloadFile(fileName, res);
            }
        });
    }
}
