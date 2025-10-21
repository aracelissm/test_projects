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
    Observable,
    Subject,
    catchError,
    concat,
    debounceTime,
    distinctUntilChanged,
    map,
    of,
    switchMap,
    tap
} from 'rxjs';
import {
    BatchingCategory,
    GetBatchingCategoriesByNameRequest
} from 'src/app/models/batching-category.model';
import {
    BatchingFamily,
    CreateBatchingFamily
} from 'src/app/models/batching-family.model';
import { Null } from 'src/app/models/general.model';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { BatchingCategoryService } from 'src/app/services/batching-category.service';
import { BatchingFamilyService } from 'src/app/services/batching-family.service';

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
    selector: 'app-add-edit-batching-family',
    templateUrl: './add-edit-batching-family.component.html',
    styleUrls: ['./add-edit-batching-family.component.scss']
})
export class AddEditBatchingFamilyComponent implements OnInit {
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
    batchingFamilyForm: UntypedFormGroup = new UntypedFormGroup({
        id: new UntypedFormControl(''),
        locationID: new UntypedFormControl(''),
        batchingCategoryId: new UntypedFormControl(''),
        name: new UntypedFormControl(''),
        descr: new UntypedFormControl(''),
        calendarColor: new UntypedFormControl(''),
        isActive: new UntypedFormControl(''),
        sort: new UntypedFormControl('')
    });

    // Single Select Vars Shared
    minLengthTerm = 0;

    // Batching Category Single Select Vars
    batchingCategoryOptions$: Observable<any> = new Observable<any>();
    batchingCategoryOptionsLoading = false;
    batchingCategoryOptionsInput$: Subject<string> = new Subject<string>();
    selectedBatchingCategory!: Null<BatchingCategory>;
    batchingCategorysList: any = [];

    selectedBatchingCategoryItem: any;
    selectedBatchingCategoryValue: any;
    batchingCategorySelectedValue: any = {};

    // Batching Category Singel Select Vars - END

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
        private batchingFamilyService: BatchingFamilyService,
        private batchingCategoryService: BatchingCategoryService,
        public sharedService: SharedService
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.params['recId'];
        this.recId = id;
        this.isAddMode = !id;
        this.initForm();

        this.sharedService.selectedPlantLocation$.subscribe((data) => {
            if (data) {
                this.locationId = data.locationId;
                this.initAddBatchingFamily();

                if (this.isAddMode) {
                    {
                        this.initAddBatchingFamily();
                        this.loadBatchingCategoryOptions();
                    }
                } else {
                    this.batchingFamilyService
                        .getBatchingFamilyById(id)
                        .subscribe((res) => {
                            if (res && res.success && res.data) {
                                this.initEditBatchingFamily(res.data);
                                this.loadBatchingCategoryOptions();
                            }
                        });
                }
            }
        });
    }

    // Dropdown Start
    getBatchingCategoryOptionLabelFn(item: any) {
        return item.name;
    }

    getBatchingCategoryOptionValueFn(item: any) {
        return item.id;
    }

    onSelectBatchingCategory(e: any) {}

    batchingCategoryTrackByFn(item: any) {
        return item.id;
    }

    onClearBatchingCategory(e: any) {
        //Set the shifts to empty
        this.onClearBatchingCategoryInternal();
    }
    onClearBatchingCategoryInternal() {
        // this.selectedBatchingCategory = [];
    }

    getBatchingCategorys(searchTerm?: string) {
        const query: GetBatchingCategoriesByNameRequest = {
            locationId: this.locationId,
            limit: 100
        };
        if (searchTerm) {
            query.batchingCategory = searchTerm;
        }
        return this.batchingCategoryService.getBatchingCategoriesByName(query);
    }

    loadBatchingCategoryOptions() {
        // This will also select the first value.
        this.batchingCategoryOptions$ = concat(
            // of([]),
            this.getBatchingCategorys().pipe(
                map((res) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.batchingCategoryOptionsInput$.pipe(
                // filter((res) => {
                //     return res !== null && res.length >= this.minLengthTerm;
                // }),
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.batchingCategoryOptionsLoading = true)),
                switchMap((term) => {
                    return this.getBatchingCategorys(term).pipe(
                        map((res) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.batchingCategoryOptionsLoading = false))
                    );
                })
            )
        );

        // Use information you just got. To fix the formValue.
        // app-single-select and app-multi-select could use some enhancements to make them work with formGroup and formControlName easily.
        this.batchingCategoryOptions$.subscribe((data) => {
            this.batchingCategorysList = data;
            const { batchingCategoryId } = this.batchingFamilyForm.value;
            if (batchingCategoryId) {
                const batchingCategory = data.find(
                    (item: any) => item.id == batchingCategoryId
                );
                this.batchingFamilyForm.patchValue({
                    batchingCategoryId: batchingCategory
                });
            }
        });
    }

    // Dropdown End

    initEditBatchingFamily(batchingFamily: BatchingFamily) {
        this.batchingFamilyForm.setValue({
            id: batchingFamily.id,
            locationID: batchingFamily.locationID,
            batchingCategoryId: batchingFamily.batchingCategoryId,
            name: batchingFamily.name,
            descr: batchingFamily.descr,
            isActive: batchingFamily.isActive,
            sort: batchingFamily.sort
        });
        this.sendData(batchingFamily.name);
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

    initAddBatchingFamily() {
        this.batchingFamilyForm.setValue({
            id: 0,
            locationID: this.locationId,
            batchingCategoryId: '',
            name: '',
            descr: '',
            isActive: true,
            sort: 0
        });
    }

    initForm() {
        this.batchingFamilyForm = this.formBuilder.group({
            id: [''],
            locationID: ['', Validators.required],
            batchingCategoryId: [''],
            name: ['', Validators.required],
            descr: [''],
            isActive: [true, Validators.required],
            sort: ['']
        });
    }

    get lf(): { [key: string]: AbstractControl } {
        return this.batchingFamilyForm.controls;
    }

    successmsg(msg: any) {
        this.toastr.success(msg);
    }

    private addBatchingFamily() {
        const { locationID, batchingCategoryId, name, descr, isActive, isDeleted, sort } =
            this.batchingFamilyForm.value;

        const data: CreateBatchingFamily = {
            locationID: locationID,
            batchingCategoryId: batchingCategoryId?.id,
            name: name,
            descr: descr,
            isActive: isActive,
            isDeleted: isDeleted,
            sort: sort
        };

        this.batchingFamilyService.createBatchingFamily(data).subscribe((res) => {
            if (res && res.success) {
                this.successmsg('Batching family is added');
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/batching-family/list-batching-family']);
                });
            }
        });
    }

    private editBatchingFamily() {
        const { locationID, batchingCategoryId, name, descr, isActive, isDeleted, sort } =
            this.batchingFamilyForm.value;
        const data: BatchingFamily = {
            id: this.recId,
            locationID: locationID,
            batchingCategoryId: batchingCategoryId?.id,
            name: name,
            descr: descr,
            isActive: isActive,
            isDeleted: isDeleted,
            sort: sort
        };
        this.batchingFamilyService
            .updateBatchingFamily(this.recId, data)
            .subscribe((res) => {
                if (res && res.success) {
                    this.successmsg('Batching family is updated');
                    this.router
                        .navigateByUrl('/', { skipLocationChange: true })
                        .then(() => {
                            this.router.navigate([
                                '/batching-family/list-batching-family'
                            ]);
                        });
                }
            });
    }

    onSubmit() {
        this.submitted = true;

        if (this.batchingFamilyForm.invalid) {
            return;
        }

        if (this.isAddMode) {
            this.addBatchingFamily();
        } else {
            this.editBatchingFamily();
        }
    }
}
