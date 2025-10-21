import { Component, OnInit, ViewChild } from '@angular/core';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    ValidationErrors,
    Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { RegExpPatterns } from 'src/app/common/constants/patterns';
import { isNullOrUndefined, isNullOrUndefinedOrEmpty } from 'src/app/common/utils';
import {
    AccountingPeriod,
    CreateAccountingPeriodRequest,
    UpdateAccountingPeriodRequest
} from 'src/app/models/accounting-period.model';
import { Null } from 'src/app/models/general.model';
import { Location } from 'src/app/models/location.model';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { AccountingPeriodService } from 'src/app/services/accounting-period.service';

import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import {  RouterModule } from '@angular/router';

import { DevExtremeModule } from 'devextreme-angular';
import { ValidationStatus } from 'devextreme/common';
import {ColumnResizeMode} from 'devextreme/common/grids';

@Component({

    selector: 'app-add-edit-accounting-period',
    templateUrl: './add-edit-accounting-period.component.html',
    styleUrls: ['./add-edit-accounting-period.component.scss']
})
export class AddEditAccountingPeriodComponent implements OnInit {
    private unsub$ = new Subject<void>();
    selectedPlantLocation!: Null<Location>;
    recId!: number;
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
    accountingPeriodForm: UntypedFormGroup = new UntypedFormGroup({
        recId: new UntypedFormControl(''),
        year: new UntypedFormControl(''),
        accountingPeriod: new UntypedFormControl(''),
        startDate: new UntypedFormControl(''),
        endDate: new UntypedFormControl(''),
        breakEvenRoofBdFt: new UntypedFormControl(null),
        breakEvenFloorBdFt: new UntypedFormControl(null),
        breakEvenPanelBdFt: new UntypedFormControl(null),
        budgetRoofBdFt: new UntypedFormControl(null),
        budgetFloorBdFt: new UntypedFormControl(null),
        budgetPanelBdFt: new UntypedFormControl(null),
        salesRoofBdFt: new UntypedFormControl(null),
        salesFloorBdFt: new UntypedFormControl(null),
        salesPanelBdFt: new UntypedFormControl(null)
    });
    submitted = false;
    isAddMode = true;
    saveAccPeriodExtension = false;
    maxDate = '';
    minDate = '';
    dataToSend!: { message: string; sender: any; image: string };

    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService,
        private accountingPeriodService: AccountingPeriodService,
        public sharedService: SharedService
    ) {}

    show = false;
    sendData(name: any) {
        this.dataToSend = {
            message: this.router.url,
            sender: name,
            image: 'assets/images/icon-fm-accountingperiods.svg'
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

    ngOnInit() {
        const id = this.route.snapshot.params['recId'];
        this.recId = id;
        this.isAddMode = !id;
        this.selectedPlantLocation = this.sharedService.selectedPlantLocationValue;
        this.sharedService.selectedPlantLocation$.pipe(takeUntil(this.unsub$)).subscribe({
            next: async (data) => {
                if (data && this.selectedPlantLocation !== data) {
                    this.selectedPlantLocation = data;
                    if (this.isAddMode) {
                        this.getLatestAccountingPeriod();
                    } else {
                        this.getAccountingPeriodById(id);
                    }
                }
            }
        });
        this.initForm();
        if (this.isAddMode) {
            this.getLatestAccountingPeriod();
        } else {
            this.getAccountingPeriodById(id);
        }
    }

    private getLatestAccountingPeriod() {
        this.accountingPeriodService.getLatestAccountingPeriod().subscribe((res) => {
            if (res && res.success && res.data) {
                this.initAddAccountingPeriod(this.generateAccountingPeriod(res.data));
            }
        });
    }

    private getAccountingPeriodById(id: number) {
        this.accountingPeriodService
            .getAccountingPeriodById(
                id,
                true,
                this.selectedPlantLocation?.locationId || 0
            )
            .subscribe((res) => {
                if (res && res.success && res.data) {
                    this.initEditAccountingPeriod(res.data);
                }
            });
    }

    private setCalendarRange(year: number) {
        this.minDate = year + '-01-01';
        this.maxDate = year + '-12-31';
    }

    onAccountingPeriodYearChanged($event: number) {
        const len = $event.toString().length;
        if (len !== 4) {
            return;
        }

        this.setCalendarRange($event);
    }

    generateAccountingPeriod(prevPeriod: AccountingPeriod): AccountingPeriod {
        const currentDate: Date = new Date();
        const currentYear = currentDate.getFullYear();

        let recId = 0;
        let year = isNullOrUndefined(prevPeriod) ? currentYear : prevPeriod.year;
        let periodNumber = 1;
        let periodBegin: Date = new Date(year, 0, 1);
        let periodEnd: Date = new Date(year, 0, 31);

        if (
            prevPeriod !== null &&
            new Date(prevPeriod.periodEnd).getTime() < new Date(year, 11, 31).getTime()
        ) {
            periodNumber = prevPeriod.periodNumber + 1;
            periodBegin = new Date(
                new Date(prevPeriod.periodEnd).getTime() + 24 * 60 * 60 * 1000
            );
            periodEnd = new Date(
                new Date(periodBegin).getTime() + 30 * 24 * 60 * 60 * 1000 - 1
            );

            if (periodEnd.getFullYear() !== year) {
                periodEnd = new Date(year, 11, 31);
            }
        } else if (
            prevPeriod !== null &&
            new Date(prevPeriod.periodEnd).getTime() === new Date(year, 11, 31).getTime()
        ) {
            year = year + 1;
            periodBegin = new Date(
                new Date(prevPeriod.periodEnd).getTime() + 24 * 60 * 60 * 1000
            );
            periodEnd = new Date(
                new Date(periodBegin).getTime() + 30 * 24 * 60 * 60 * 1000 - 1
            );
        }

        return {
            recId,
            year,
            periodNumber,
            periodBegin,
            periodEnd,
            accPeriodExtension: null
        };
    }

    initEditAccountingPeriod(accountingPeriod: AccountingPeriod) {
        this.setCalendarRange(accountingPeriod.year);
        this.accountingPeriodForm.patchValue({
            recId: accountingPeriod.recId,
            year: accountingPeriod.year,
            accountingPeriod: accountingPeriod.periodNumber,
            startDate: this.formatDate(accountingPeriod.periodBegin),
            endDate: this.formatDate(accountingPeriod.periodEnd)
        });
        if (accountingPeriod.accPeriodExtension) {
            this.saveAccPeriodExtension = true;
            this.accountingPeriodForm.patchValue({
                breakEvenRoofBdFt: accountingPeriod.accPeriodExtension.breakEvenRoofBdFt,
                breakEvenFloorBdFt:
                    accountingPeriod.accPeriodExtension.breakEvenFloorBdFt,
                breakEvenPanelBdFt:
                    accountingPeriod.accPeriodExtension.breakEvenPanelBdFt,
                budgetRoofBdFt: accountingPeriod.accPeriodExtension.budgetRoofBdFt,
                budgetFloorBdFt: accountingPeriod.accPeriodExtension.budgetFloorBdFt,
                budgetPanelBdFt: accountingPeriod.accPeriodExtension.budgetPanelBdFt,
                salesRoofBdFt: accountingPeriod.accPeriodExtension.salesRoofBdFt,
                salesFloorBdFt: accountingPeriod.accPeriodExtension.salesFloorBdFt,
                salesPanelBdFt: accountingPeriod.accPeriodExtension.salesPanelBdFt
            });
        } else {
            this.saveAccPeriodExtension = false;
            this.accountingPeriodForm.patchValue({
                breakEvenRoofBdFt: null,
                breakEvenFloorBdFt: null,
                breakEvenPanelBdFt: null,
                budgetRoofBdFt: null,
                budgetFloorBdFt: null,
                budgetPanelBdFt: null,
                salesRoofBdFt: null,
                salesFloorBdFt: null,
                salesPanelBdFt: null
            });
        }
        this.sendData(this.formatDate(accountingPeriod.periodBegin));
    }

    initAddAccountingPeriod(accountingPeriod: AccountingPeriod) {
        this.setCalendarRange(accountingPeriod.year);
        this.accountingPeriodForm.patchValue({
            recId: 0,
            year: accountingPeriod.year,
            accountingPeriod: accountingPeriod.periodNumber,
            startDate: this.formatDate(accountingPeriod.periodBegin),
            endDate: this.formatDate(accountingPeriod.periodEnd)
        });
    }

    initForm() {
        this.accountingPeriodForm = this.formBuilder.group({
            recId: [''],
            year: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
            accountingPeriod: [
                '',
                [Validators.required, Validators.pattern(/^\d{1,2}$/)]
            ],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
            breakEvenRoofBdFt: [
                null,
                Validators.pattern(RegExpPatterns.WholeNumbersAndPositiveDecimalNumbers)
            ],
            breakEvenFloorBdFt: [
                null,
                Validators.pattern(RegExpPatterns.WholeNumbersAndPositiveDecimalNumbers)
            ],
            breakEvenPanelBdFt: [
                null,
                Validators.pattern(RegExpPatterns.WholeNumbersAndPositiveDecimalNumbers)
            ],
            budgetRoofBdFt: [
                null,
                Validators.pattern(RegExpPatterns.WholeNumbersAndPositiveDecimalNumbers)
            ],
            budgetFloorBdFt: [
                null,
                Validators.pattern(RegExpPatterns.WholeNumbersAndPositiveDecimalNumbers)
            ],
            budgetPanelBdFt: [
                null,
                Validators.pattern(RegExpPatterns.WholeNumbersAndPositiveDecimalNumbers)
            ],
            salesRoofBdFt: [
                null,
                Validators.pattern(RegExpPatterns.WholeNumbersAndPositiveDecimalNumbers)
            ],
            salesFloorBdFt: [
                null,
                Validators.pattern(RegExpPatterns.WholeNumbersAndPositiveDecimalNumbers)
            ],
            salesPanelBdFt: [
                null,
                Validators.pattern(RegExpPatterns.WholeNumbersAndPositiveDecimalNumbers)
            ]
        });
    }

    get lf(): { [key: string]: AbstractControl } {
        return this.accountingPeriodForm.controls;
    }

    getPatternErrMsg(): string {
        return 'Please enter a valid number. It can be a whole number (e.g., 123) or a decimal number (e.g., 123.45).';
    }

    onChangeAccPeriodExtensionField(fieldName: string): void {
        const value = this.accountingPeriodForm.get(fieldName)?.value;
        if (value && !this.saveAccPeriodExtension) {
            this.saveAccPeriodExtension = true;
        }
    }

    private formatDate(date: string | number | Date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        return [year, month, day].join('-');
    }

    private addAccountingPeriod() {
        const { year, accountingPeriod, startDate, endDate } =
            this.accountingPeriodForm.value;
        const data: CreateAccountingPeriodRequest = {
            year,
            periodNumber: accountingPeriod,
            periodBegin: startDate,
            periodEnd: endDate
        };
        this.accountingPeriodService.createAccountingPeriod(data).subscribe((res) => {
            if (res && res.success) {
                this.toastr.success('Accounting period is added');
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/accounting-period/list-accounting-period']);
                });
            }
        });
    }

    private editAccountingPeriod() {
        const { year, accountingPeriod, startDate, endDate } =
            this.accountingPeriodForm.value;
        const data: UpdateAccountingPeriodRequest = {
            recId: this.recId,
            year,
            periodNumber: accountingPeriod,
            periodBegin: startDate,
            periodEnd: endDate
        };
        if (this.saveAccPeriodExtension && this.selectedPlantLocation) {
            const {
                breakEvenRoofBdFt,
                breakEvenFloorBdFt,
                breakEvenPanelBdFt,
                budgetRoofBdFt,
                budgetFloorBdFt,
                budgetPanelBdFt,
                salesRoofBdFt,
                salesFloorBdFt,
                salesPanelBdFt
            } = this.accountingPeriodForm.value;
            data.accPeriodExtension = {
                locationId: this.selectedPlantLocation.locationId,
                accPeriodRecId: this.recId,
                breakEvenRoofBdFt: breakEvenRoofBdFt || 0,
                breakEvenFloorBdFt: breakEvenFloorBdFt || 0,
                breakEvenPanelBdFt: breakEvenPanelBdFt || 0,
                budgetRoofBdFt: budgetRoofBdFt || 0,
                budgetFloorBdFt: budgetFloorBdFt || 0,
                budgetPanelBdFt: budgetPanelBdFt || 0,
                salesRoofBdFt: salesRoofBdFt || 0,
                salesFloorBdFt: salesFloorBdFt || 0,
                salesPanelBdFt: salesPanelBdFt || 0
            };
        }
        this.accountingPeriodService
            .updateAccountingPeriod(this.recId, data)
            .subscribe((res) => {
                if (res && res.success) {
                    this.toastr.success('Accounting period is updated');
                    this.router
                        .navigateByUrl('/', { skipLocationChange: true })
                        .then(() => {
                            this.router.navigate([
                                '/accounting-period/list-accounting-period'
                            ]);
                        });
                }
            });
    }

    onChangeDate($event: any) {
        this.compareDates();
    }

    compareDates() {
        if (
            isNullOrUndefinedOrEmpty(this.accountingPeriodForm.get('startDate')?.value) ||
            isNullOrUndefinedOrEmpty(this.accountingPeriodForm.get('endDate')?.value)
        ) {
            return;
        }
        if (
            this.accountingPeriodForm.get('endDate')?.value <
            this.accountingPeriodForm.get('startDate')?.value
        ) {
            this.accountingPeriodForm
                .get('startDate')
                ?.setErrors({ dateComparison: true });
            this.accountingPeriodForm.get('endDate')?.setErrors({ dateComparison: true });
        } else {
            this.accountingPeriodForm.get('startDate')?.setErrors(null);
            this.accountingPeriodForm.get('endDate')?.setErrors(null);
        }
    }

    onSubmit() {
        this.submitted = true;

        if (this.accountingPeriodForm.invalid) {
            return;
        }

        if (this.isAddMode) {
            this.addAccountingPeriod();
        } else {
            this.editAccountingPeriod();
        }
    }

    ngOnDestroy() {
        this.unsub$.next();
        this.unsub$.complete();
    }
}
