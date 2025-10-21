import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveExcelFileToLocal } from 'src/app/common/helpers';
import { GetAudit } from 'src/app/models/job.model';
import { GridConfigurationService } from 'src/app/modules/shared/services/grid-configuration.service';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { JobService } from 'src/app/services/job.service';

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
    selector: 'app-bid-audit-trail',
    templateUrl: './bid-audit-trail.component.html',
    styleUrls: ['./bid-audit-trail.component.scss']
})
export class BidAuditTrailComponent implements OnInit {
    @ViewChild(DxDataGridComponent)
    dataGrid!: DxDataGridComponent;
    audit!: GetAudit[];
    selectedJobKeys: any;
    change: any;
    name = 'Bids';

    constructor(
        private jobService: JobService,
        private route: ActivatedRoute,
        private sharedService: SharedService,
        private gridConfigService: GridConfigurationService
    ) {
        this.storeData();
        this.columnChooserModes = [
            {
                key: 'dragAndDrop',
                name: 'Drag and drop'
            },
            {
                key: 'select',
                name: 'Select'
            }
        ];
    }
    pageSizeOptions: number[] = [15, 25, 50, 100];
    selectedPageSize: number = this.pageSizeOptions[0];
    dataGridHeight = 0;
    columnChooserModes: any;
    gridCount = 0;
    private calcDataGridHeight(): void {
        this.dataGridHeight =
            52 +
            60 +
            22 *
                (this.selectedPageSize <= this.gridCount
                    ? this.selectedPageSize
                    : this.gridCount) +
            43;
    }
    storeData(): void {
        const key = 'bidAuditHeight';
        const value = localStorage.getItem(key);
        if (value != null) {
            this.selectedPageSize = Number(value);
        }
        this.calcDataGridHeight();
        this.loadStateOfMyWorkOrdersDGH();
    }

    loadStateOfMyWorkOrdersDGH = () => {
        return this.sharedService.getUserDataQueryPreference('bidAuditHeight');
    };

    saveStateOfMyWorkOrdersDGH = () => {
        this.sharedService.saveUserDataQueryPreference(
            'bidAuditHeight',
            this.selectedPageSize
        );
    };

    onSelectPageSize() {
        this.calcDataGridHeight();
        this.saveStateOfMyWorkOrdersDGH();
    }
    pageSizeTrackByFn(item: number) {
        return item;
    }

    getPageSizeOptionLabelFn(item: number) {
        return item;
    }

    ngAfterViewInit() {
        const defaultOptions = this.gridConfigService.getCommonGridOptions();
        this.dataGrid.instance.option(defaultOptions);
    }
    isUndo = true;
    onContentReady(e: any) {
        if (
            e.component.getCombinedFilter() !== undefined &&
            e.component.getCombinedFilter().length > 0
        ) {
            this.isUndo = false;
        } else {
            this.isUndo = true;
        }
    }
    loadState = () => {
        return this.sharedService.getUserDataQueryPreference('bidauditGrid');
    };

    saveState = (state: any) => {
        this.sharedService.saveUserDataQueryPreference('bidauditGrid', state);
    };
    ngOnInit(): void {
        this.auditGrid();
        this.sharedService.isNotificationUpdated.subscribe((res) => {
            this.auditGrid();
        });
    }
    auditGrid() {
        const id = this.route.snapshot.params['rec_Id'];
        this.jobService.getAudit(id, this.name).subscribe((res) => {
            if (res && res.success && res.data) {
                this.gridCount = res.data?.length || 0;
                this.audit = res.data;
                this.storeData();
            }
        });
    }

    onClickAudit(e: any) {
        this.jobService.getChange(this.selectedJobKeys).subscribe((res) => {
            if (res && res.success && res.data) {
                this.change = res.data.changes;
            }
        });
    }

    onExporting(e: any) {
        const name = 'Audit';
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(name);
        exportDataGrid({
            component: e.component,
            worksheet: worksheet
        }).then(() => saveExcelFileToLocal(workbook, name));
        e.cancel = true;
    }

    onClickCancel() {
        this.dataGrid.instance.getScrollable().scrollTo(0);
        this.dataGrid.instance.clearFilter();
    }
}
