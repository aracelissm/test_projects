import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { generateUniqueId } from 'src/app/common/helpers';
import { convertBase64ToBlobData } from 'src/app/common/utils';
import { BatchingReportType } from 'src/app/enums/batching-report-type';
import { LaserCutReportRequest, ShopDrawingReportRequest } from 'src/app/models/batching-report.model';
import { BatchingReportService } from 'src/app/services/batching-report.service';

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
    selector: 'app-pdf-reports',
    templateUrl: './pdf-reports.component.html',
    styleUrls: ['./pdf-reports.component.scss']
})
export class PdfReportsComponent implements OnInit {
    pdfSource!: string;
    loadingPanelVisible = false;
    jobKey!: string;
    reportType!: BatchingReportType;
    fileName!: string;

    constructor(
        private batchingReportService: BatchingReportService,
        public route: ActivatedRoute,
        public toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.loadingPanelVisible = true;
        this.jobKey = this.route.snapshot.params['jobKey'];
        this.reportType = this.route.snapshot.params['report'];
        this.loadFileData();
    }

    loadFileData() {
        if (this.reportType === BatchingReportType.LASERCUT) {
            var request: LaserCutReportRequest = { jobItemRecIds: [], marks: []};
            this.batchingReportService.getLaserCutReport(this.jobKey, request).subscribe({
                next: (res: any) => {
                    this.pdfSource = URL.createObjectURL(res.body);
                    this.loadingPanelVisible = false;
                    this.fileName = res.headers
                        .get('content-disposition')
                        .split(';')[1]
                        .split('filename')[1]
                        .split('=')[1]
                        .trim();
                    this.loadingPanelVisible = false;
                },
                error: (err: any) => {
                    this.toastr.error('Failed to get file');
                    this.loadingPanelVisible = false;
                }
            });
        } else if (this.reportType === BatchingReportType.ALLBATCHES) {
            this.batchingReportService.getBatchSummaryReport(this.jobKey).subscribe({
                next: (res: any) => {
                    this.pdfSource = URL.createObjectURL(res.body);
                    this.loadingPanelVisible = false;
                    this.fileName = res.headers
                        .get('content-disposition')
                        .split(';')[1]
                        .split('filename')[1]
                        .split('=')[1]
                        .trim();
                    this.loadingPanelVisible = false;
                },
                error: (err: any) => {
                    this.toastr.error('Failed to get file');
                    this.loadingPanelVisible = false;
                }
            });
        } else if (this.reportType === BatchingReportType.SHOPDRAWING) {
            var request: ShopDrawingReportRequest = { jobItemRecIds: [], marks: []};
            this.batchingReportService.getShopDrawingReport(this.jobKey, request).subscribe({
                next: (res: any) => {
                    this.pdfSource = URL.createObjectURL(res.body);
                    this.loadingPanelVisible = false;
                    this.fileName = res.headers
                        .get('content-disposition')
                        .split(';')[1]
                        .split('filename')[1]
                        .split('=')[1]
                        .trim();
                    this.loadingPanelVisible = false;
                },
                error: (err: any) => {
                    this.toastr.error('Failed to get file');
                    this.loadingPanelVisible = false;
                }
            });
        }
    }

    download() {
        const url = this.pdfSource;
        this.openLink(url);
        setTimeout(function () {
            window.URL.revokeObjectURL(url);
        }, 5000);
    }

    private openLink(url: string) {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = url;
        a.download = this.fileName;
        a.click();
        document.body.removeChild(a);
    }
}
