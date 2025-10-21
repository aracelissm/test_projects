import { Component, OnInit, ViewChild } from '@angular/core';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import {
    BatchingCategory,
    CreateBatchingCategory
} from 'src/app/models/batching-category.model';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { BatchingCategoryService } from 'src/app/services/batching-category.service';

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
    selector: 'app-add-edit-batching-category',
    templateUrl: './add-edit-batching-category.component.html',
    styleUrls: ['./add-edit-batching-category.component.scss']
})
export class AddEditBatchingCategoryComponent implements OnInit {
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
    batchingCategoryForm: UntypedFormGroup = new UntypedFormGroup({
        id: new UntypedFormControl(''),
        locationID: new UntypedFormControl(''),
        name: new UntypedFormControl(''),
        descr: new UntypedFormControl(''),
        isActive: new UntypedFormControl(''),
        sort: new UntypedFormControl('')
    });
    submitted = false;
    isAddMode = true;
    recId!: number;
    locationId!: number;
    maxDate = '';
    minDate = '';
    dataToSend: { message: string; sender: any; image: string } | undefined;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private batchingCategoryService: BatchingCategoryService,
        public sharedService: SharedService
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.params['recId'];
        this.recId = id;
        this.isAddMode = !id;
        this.initForm();

        if (this.isAddMode) {
            {
                this.sharedService.selectedPlantLocation$.subscribe((data) => {
                    if (data) {
                        this.locationId = data.locationId;
                        this.initAddBatchingCategory();
                    }
                });
                this.initAddBatchingCategory();
            }
        } else {
            this.batchingCategoryService.getBatchingCategoryById(id).subscribe((res) => {
                if (res && res.success && res.data) {
                    this.initEditBatchingCategory(res.data);
                }
            });
        }
    }

    initEditBatchingCategory(batchingCategory: BatchingCategory) {
        this.batchingCategoryForm.setValue({
            id: batchingCategory.id,
            locationID: batchingCategory.locationID,
            name: batchingCategory.name,
            descr: batchingCategory.descr,
            isActive: batchingCategory.isActive,
            sort: batchingCategory.sort
        });
        this.sendData(batchingCategory.name);
    }
    show = false;
    sendData(name: any) {
        this.dataToSend = {
            message: this.router.url,
            sender: name,
            image: 'assets/images/Job-Truss.svg'
        };
        if (localStorage['datas'] != undefined) {
            const permission = JSON.parse(localStorage['datas']);

            const found = permission.some((obj: any) =>
                this.sharedService.isEqual(obj, this.dataToSend)
            );
            this.show = true;
            if (!found) {
                this.sharedService.addData(this.dataToSend);
            } else {
                this.sharedService.setData(this.dataToSend);
            }
        } else {
            this.show = true;
            this.sharedService.addData(this.dataToSend);
        }
    }

    initAddBatchingCategory() {
        this.batchingCategoryForm.setValue({
            id: 0,
            locationID: this.locationId,
            name: '',
            descr: '',
            isActive: true,
            sort: 0
        });
    }

    initForm() {
        this.batchingCategoryForm = this.formBuilder.group({
            id: [''],
            locationID: ['', Validators.required],
            name: ['', Validators.required],
            descr: [''],
            isActive: [true, Validators.required],
            sort: ['']
        });
    }

    get lf(): { [key: string]: AbstractControl } {
        return this.batchingCategoryForm.controls;
    }

    successmsg(msg: any) {
        this.toastr.success(msg);
    }

    private addBatchingCategory() {
        const { locationID, name, descr, isActive, isDeleted, sort } =
            this.batchingCategoryForm.value;

        const data: CreateBatchingCategory = {
            locationID: locationID,
            name: name,
            descr: descr,
            isActive: isActive,
            isDeleted: isDeleted,
            sort: sort
        };
        this.batchingCategoryService.createBatchingCategory(data).subscribe((res) => {
            if (res && res.success) {
                this.successmsg('Batching category is added');
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/batching-category/list-batching-category']);
                });
            }
        });
    }

    private editBatchingCategory() {
        const { id, locationID, name, descr, isActive, isDeleted, sort } =
            this.batchingCategoryForm.value;
        const data: BatchingCategory = {
            id: this.recId,
            locationID: locationID,
            name: name,
            descr: descr,
            isActive: isActive,
            isDeleted: isDeleted,
            sort: sort
        };
        this.batchingCategoryService
            .updateBatchingCategory(this.recId, data)
            .subscribe((res) => {
                if (res && res.success) {
                    this.successmsg('Batching category is updated');
                    this.router
                        .navigateByUrl('/', { skipLocationChange: true })
                        .then(() => {
                            this.router.navigate([
                                '/batching-category/list-batching-category'
                            ]);
                        });
                }
            });
    }

    onSubmit() {
        this.submitted = true;

        if (this.batchingCategoryForm.invalid) {
            return;
        }

        if (this.isAddMode) {
            this.addBatchingCategory();
        } else {
            this.editBatchingCategory();
        }
    }
}
