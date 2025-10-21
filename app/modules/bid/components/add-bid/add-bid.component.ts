import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
    AbstractControl,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { clear, Console, timeStamp } from 'console';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import moment from 'moment';import { ToastrService } from 'ngx-toastr';
import { confirm } from 'devextreme/ui/dialog';
import {
    catchError,
    concat,
    debounceTime,
    distinctUntilChanged,
    firstValueFrom,
    map,
    Observable,
    of,
    Subject,
    switchMap,
    tap
} from 'rxjs';
import { isNullOrUndefined, isNullOrUndefinedOrEmpty } from 'src/app/common/utils';
import {
    AddCreateBid,
    BidStatus,
    BidType,
    GetBidJob,
    GetbidtypeResponse,
    ProductLine
} from 'src/app/models/bid.model';
import { createBidContact, CreateContact } from 'src/app/models/contact.model';
import { CreateCustomer, GetCustomer } from 'src/app/models/customer.model';
import { MatDialog } from '@angular/material/dialog';
import {
    GetCustomerOptionsRequest,
    GetCustomerOptionsResponse,
    GetCustomersRequest,
    GetCustomersResponse,
    GetJobTypesRequest,
    GetJobTypesResponse,
    GetPlantLocationsResponse,
    GetProjectsRequest
} from 'src/app/models/forecasting.model';
import { Null } from 'src/app/models/general.model';
import { GetLocationsRequest, Location } from 'src/app/models/location.model';
import { AddBidProject, Project } from 'src/app/models/project.model';
import { FileManagerDialogComponent } from 'src/app/modules/shared/components/dialogs/file-manager-dialog/file-manager-dialog.component';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { BidService, Customer } from 'src/app/services/bid.service';
import { ContactService } from 'src/app/services/contact.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocationService } from 'src/app/services/location.service';
import { ProjectService } from 'src/app/services/project.service';
import { ForecastingService } from 'src/app/services/forecasting.service';
import { JobService } from 'src/app/services/job.service';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveExcelFileToLocal } from 'src/app/common/helpers';
import CustomStore from 'devextreme/data/custom_store';
import { DxDataGridComponent } from 'devextreme-angular';
import { GridConfigurationService } from 'src/app/modules/shared/services/grid-configuration.service';
import { TitleType } from 'src/app/models/transmittal.model';
import { LocationType } from 'src/app/enums/location-Type.enum';
import { Title } from '@angular/platform-browser';

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
    selector: 'app-add-bid',
    templateUrl: './add-bid.component.html',
    styleUrls: ['./add-bid.component.scss']
})
export class AddBidComponent implements OnInit {
    editMode = false;
    folder!: File;
    filename!: string;
    customer!: any;
    projectName!: any;
    contactName!: any;
    AddCustomer = false;
    AddContact = false;
    AddProject = false;
    isAddMode!: boolean;
    boolean = true;
    submittedBid = false;
    submittedCustomer = false;
    submittedProject = false;
    submittedContact = false;
    customerFilterOptions: GetCustomerOptionsResponse[] = [];
    // customerFilterOptions: GetCustomersResponse[] = [];
    customerOptions$: Observable<any> = new Observable<any>();
    customerOptionsLoading = false;
    customerOptionsInput$: Subject<string> = new Subject<string>();
    selectedCustomer: any;
    stateId: any;
    note: any;
    projectStatusOptions$: Observable<any> = new Observable<any>();
    projectStatusOptionsLoading = false;
    projectStatusOptionsInput$: Subject<string> = new Subject<string>();
    selectedprojectStatus: any;
    statusOptions$: Observable<any> = new Observable<any>();
    statusOptionsLoading = false;
    statusOptionsInput$: Subject<string> = new Subject<string>();
    selectedstatus: any;
    selectedCustomerStatus: any;
    salesRepOptions$: Observable<any> = new Observable<any>();
    salesRepOptionsLoading = false;
    salesRepOptionsInput$: Subject<string> = new Subject<string>();
    selectedsalesRep: any;
    selectedSalesRep: any;
    projectOptions$: Observable<any> = new Observable<any>();
    projectOptionsLoading = false;
    projectOptionsInput$: Subject<string> = new Subject<string>();
    selectedProject: any;
    termsOptions$: Observable<any> = new Observable<any>();
    termsOptionsLoading = false;
    termsOptionsInput$: Subject<string> = new Subject<string>();
    selectedterms: any;
    minLengthTerm = 0;
    contactOptions$: Observable<any> = new Observable<any>();
    contactOptionsLoading = false;
    contactOptionsInput$: Subject<string> = new Subject<string>();
    selectedcontact: any;
    countyOptions$: Observable<any> = new Observable<any>();
    countyOptionsLoading = false;
    countyOptionsInput$: Subject<string> = new Subject<string>();
    selectedcounty: any;
    stateOptions$: Observable<any> = new Observable<any>();
    stateOptionsLoading = false;
    stateOptionsInput$: Subject<string> = new Subject<string>();
    selectedstate: any;
    customerProjectOptions$: Observable<any> = new Observable<any>();
    customerProjectOptionsLoading = false;
    customerProjectOptionsInput$: Subject<string> = new Subject<string>();
    customerProjectSelected: any;
    bidStatusOptions$: Observable<any> = new Observable<any>();
    bidStatusOptionsLoading = false;
    bidStatusOptionsInput$: Subject<string> = new Subject<string>();
    bidSelectedstatus: any;

    ProductLineOptions$: Observable<any> = new Observable<any>();
    ProductLineOptionsLoading = false;
    ProductLineOptionsInput$: Subject<string> = new Subject<string>();
    ProductLineSelected: any;

    BeamsOptions$: Observable<any> = new Observable<any>();
    BeamsOptionsLoading = false;
    BeamsOptionsInput$: Subject<string> = new Subject<string>();
    BeamsSelected: any;

    FloorSizeOptions$: Observable<any> = new Observable<any>();
    FloorSizeOptionsLoading = false;
    FloorSizeOptionsInput$: Subject<string> = new Subject<string>();
    FloorSizeSelected: any;

    BiddingMethodOptions$: Observable<any> = new Observable<any>();
    BiddingMethodOptionsLoading = false;
    BiddingMethodOptionsInput$: Subject<string> = new Subject<string>();
    BiddingMethodSelected: any;

    LevelReturnsOptions$: Observable<any> = new Observable<any>();
    LevelReturnsOptionsLoading = false;
    LevelReturnsOptionsInput$: Subject<string> = new Subject<string>();
    LevelReturnsSelected: any;

    SeatPlatesOptions$: Observable<any> = new Observable<any>();
    SeatPlatesOptionsLoading = false;
    SeatPlatesOptionsInput$: Subject<string> = new Subject<string>();
    SeatPlatesSelected: any;

    HipCatsOptions$: Observable<any> = new Observable<any>();
    HipCatsOptionsLoading = false;
    HipCatsOptionsInput$: Subject<string> = new Subject<string>();
    HipCatsSelected: any;

    StdNotesOptions$: Observable<any> = new Observable<any>();
    StdNotesOptionsLoading = false;
    StdNotesOptionsInput$: Subject<string> = new Subject<string>();
    SelectedNotes: Array<any> = [];
    StdNotesSelected: any;

    bidTypeOptions$: Observable<any> = new Observable<any>();
    bidTypeOptionsLoading = false;
    bidTypeOptionsInput$: Subject<string> = new Subject<string>();
    bidTypeSelected: any;
    defaultContactOptions$: Observable<any> = new Observable<any>();
    defaultContactOptionsLoading = false;
    defaultContactOptionsInput$: Subject<string> = new Subject<string>();
    selectedDefaultContact: any;
    bidtypevalue: any;
    bidstatusvalue: any;
    productTypevalue: any;
    productTypeDataSource: any;
    bidlogindate: string | number | Date = moment().format('YYYY-MM-DD');
    plansdate: string | number | Date = moment().format('YYYY-MM-DD');
    indexdate!: string | number | Date;
    bidclosingdate!: string | number | Date;
    bidsubmitted!: string | number | Date;
    today: string | number | Date = moment().format('YYYY-MM-DD');
    bidduedate: any;
    minToDate?: string | number | Date = new Date();
    endDate: number | number | Date = new Date();
    modelInfovalue: any;
    filterTypeOptionsDataSource!: ArrayStore;
    selectedFilterType!: number;
    model_Info: any;
    lat: any;
    long: any;
    jobTypeOptions$: Observable<any> = new Observable<any>();
    jobTypeOptionsLoading = false;
    jobTypeOptionsInput$: Subject<string> = new Subject<string>();
    jobClassificationOptions$: Observable<any> = new Observable<any>();
    jobClassificationOptionsLoading = false;
    jobClassificationOptionsInput$: Subject<string> = new Subject<string>();
    plantLocationOptions$: Observable<any> = new Observable<any>();
    plantLocationOptionsLoading = false;
    plantLocationOptionsInput$: Subject<string> = new Subject<string>();
    selectedPlantLocation!: Null<Location>;
    previousSelectedPlantLocation!: Null<Location>;
    jobTypeFilterOptions: GetJobTypesResponse[] = [];
    plantLocationFilterOptions: GetPlantLocationsResponse[] = [];
    additionalCustomer: any = [];
    customerName: any;
    noteappend: any;
    bidstatus!: BidStatus[];
    bidstatusDataSource!: DataSource;
    bidstatusid!: number;
    bidtype!: BidType[];
    bidtypeDataSource: any;
    bidtypeid!: number;
    productLine!: ProductLine[];
    productLineId!: number;
    bidtypeFilterOptions: GetbidtypeResponse[] = [];
    projectdropdown: any;
    selectedType: any;
    selectedClassification: any;
    contact: any;
    customerproject: any;
    active = 'ACTIVE';
    bidType = 'New Bid';
    bidStatus = 'In Design';
    framing = false;
    setDueDate = true;
    locdefault: any;
    PLANT_LOC: any;
    selectedProjectType: any;
    selectedProjectClassification: any;
    billToCustomerOptions$: Observable<any> = new Observable<any>();
    billToCustomerOptionsLoading = false;
    billToCustomerOptionsInput$: Subject<string> = new Subject<string>();
    selectedBillToCustomer: any;
    projectedStartDate!: string | number | Date;
    projectedEndDate!: string | number | Date;
    //lat:number;
    //long:number;
    error: any = { isError: false, errorMessage: '' };
    error1: any = { isError1: false, errorMessage: '' };
    errorProject: any = { isProjectError: false, errorMessage: '' };
    @Input() customerKey!: string;
    bufferDays!: any;
    newProjectID!: any;
    newProjectName: any;
    newProjectAdded = false;
    customers: Customer[] = [];
    addedCustomer: any;
    additionalCustomers!: GetCustomersResponse[];
    SelectedAdditionalCustomer: any = [];
    AddCustData: any = [];
    biddingCustomerKey: any;
    searchJobOptions$: Observable<any> = new Observable<any>();
    searchJobOptionsLoading = false;
    searchJobOptionsInput$: Subject<string> = new Subject<string>();
    selectedSearchJob: any;
    searchJobs: any = [];
    customerPopupVisible = false;
    editorOptions = {
        showClearButton: true
    };
    searchResult = '';
    statusLookupData = [
        { value: 'ACTIVE', text: 'ACTIVE' },
        { value: 'INACTIVE', text: 'INACTIVE' },
        { value: 'TARGET', text: 'TARGET' }
    ];
    dataSource!: CustomStore;
    selectedCustomerBidder: any;
    statusResult!: string;
    selectedProjectPlantLocation: any;
    recordId: any;
    addedCustomerName: any;
    customerKeys: any;
    nameHead: any;
    @ViewChild('customerGrid', { static: false }) customerGrid!: DxDataGridComponent;
    @ViewChild('salesGrid', { static: false }) salesGrid!: DxDataGridComponent;
    bidSalesRep: string | undefined;
    projectSalesRep: string | undefined;
    previousTitle = '';
    createcustomerForm: UntypedFormGroup = new UntypedFormGroup({
        cusT_NAME: new UntypedFormControl(''),
        cusT_KEY: new UntypedFormControl(''),
        bilL_ADDR1: new UntypedFormControl(''),
        bilL_ADDR2: new UntypedFormControl(''),
        bilL_ADDR3: new UntypedFormControl(''),
        cust_Active: new UntypedFormControl('')
    });
    createprojectForm: UntypedFormGroup = new UntypedFormGroup({
        customerKey: new UntypedFormControl(''),
        subdivision: new UntypedFormControl(''),
        salesRepEmail: new UntypedFormControl(''),
        job_Type: new UntypedFormControl(''),
        notes: new UntypedFormControl(''),
        active: new UntypedFormControl('')
    });
    createcontactForm: UntypedFormGroup = new UntypedFormGroup({
        rec_Id: new UntypedFormControl(''),
        first_Name: new UntypedFormControl(''),
        last_Name: new UntypedFormControl(''),
        title: new UntypedFormControl(''),
        email_Address: new UntypedFormControl(''),
        office_Mobile: new UntypedFormControl(''),
        office_Phone: new UntypedFormControl(''),
        office_Fax: new UntypedFormControl(''),
        addr1: new UntypedFormControl(''),
        addr2: new UntypedFormControl(''),
        addr3: new UntypedFormControl(''),
        c_comments: new UntypedFormControl('')
    });
    createBidForm: UntypedFormGroup = new UntypedFormGroup({
        model_Info: new UntypedFormControl(''),
        bidNotes: new UntypedFormControl(''),
        bid_Number: new UntypedFormControl(''),
        product_type: new UntypedFormControl(''),
        last_Name: new UntypedFormControl(''),
        framing: new UntypedFormControl(''),
        Bid_Units_Roof: new UntypedFormControl(''),
        Design_Units_Roof: new UntypedFormControl(''),
        Avg_Unit_Roof: new UntypedFormControl(''),
        Total$: new UntypedFormControl(''),
        amenities: new UntypedFormControl(''),
        Bid_Bdft_Roof: new UntypedFormControl(''),
        AvgCostBdft: new UntypedFormControl(''),
        Total_Project: new UntypedFormControl(''),
        FloorPSF: new UntypedFormControl(''),
        RoofPSF: new UntypedFormControl(''),
        WindLoading: new UntypedFormControl(''),
        PlansBy: new UntypedFormControl(''),
        FloorDepth: new UntypedFormControl(''),
        FloorSpacing: new UntypedFormControl(''),
        IndexAmount: new UntypedFormControl(''),
        Bid_Comment: new UntypedFormControl(''),
        Status_Comment: new UntypedFormControl(''),
        label: new UntypedFormControl(''),
        jobDir: new UntypedFormControl(''),
        joB_REF2: new UntypedFormControl('')
    });
    constructor(
        private fb: UntypedFormBuilder,
        private toastr: ToastrService,
        private customerService: CustomerService,
        private bidService: BidService,
        private contactService: ContactService,
        private projectService: ProjectService,
        private locationService: LocationService,
        private router: Router,
        private route: ActivatedRoute,
        private sharedService: SharedService,
        public dialog: MatDialog,
        public forecastingService: ForecastingService,
        public jobService: JobService,
        private gridConfigService: GridConfigurationService,
        private titleService: Title
    ) {
        this.onClickDeleteAddCustomer = this.onClickDeleteAddCustomer.bind(this);
        this.customers = this.bidService.getBidders();
        this.customers = [];
        const query: GetCustomerOptionsRequest = {
            showTargetCustomers: true
        };
        this.forecastingService.getCustomerOptions(query).subscribe((res) => {
            if (res && res.success && res.data) {
                this.additionalCustomers = res.data;
            }
        });
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
        const key = 'addBidHeight';
        const value = localStorage.getItem(key);
        if (value != null) {
            this.selectedPageSize = Number(value);
        }
        this.calcDataGridHeight();
        this.loadStateOfMyWorkOrdersDGH();
    }

    loadStateOfMyWorkOrdersDGH = () => {
        return this.sharedService.getUserDataQueryPreference('addBidHeight');
    };

    saveStateOfMyWorkOrdersDGH = () => {
        this.sharedService.saveUserDataQueryPreference(
            'addBidHeight',
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
        this.customerGrid.instance.option(defaultOptions);
        this.salesGrid.instance.option(defaultOptions);
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
    ngOnInit(): void {
        this.previousTitle = this.titleService.getTitle();
        this.titleService.setTitle('IPSFL - Create Bid');
        this.initFormProject();
        this.initFormcustomer();
        this.initFormContact();
        this.initFormBid();
        this.loadOptions();
        this.selectedCustomerStatus = {
            custStatus: this.active
        };
        this.bidTypeSelected = {
            bidType: this.bidType
        };
        this.bidSelectedstatus = {
            bidStatus: this.bidStatus
        };

        this.previousSelectedPlantLocation = this.selectedPlantLocation;
        this.locdefault = this.selectedPlantLocation;
        this.bidService.getGenerateNumber().subscribe((res) => {
            if (res && res.success) {
                if (this.framing == true) {
                    if (this.editMode == true) {
                        this.createBidForm.patchValue({
                            bid_Number: 'BF' + res.data
                        });
                    } else {
                        this.selectedSearchJob = {
                            jobKey: 'BF' + res.data
                        };
                    }
                } else {
                    if (this.editMode == true) {
                        this.createBidForm.patchValue({
                            bid_Number: 'B' + res.data
                        });
                    } else {
                        this.selectedSearchJob = {
                            jobKey: 'B' + res.data
                        };
                    }
                }
            }
        });
        this.bidService.getAllBidConfigurations().subscribe((res) => {
            if (res && res.success && res.data) {
                this.bufferDays = res.data[0].bufferDaysBetweenLoginDateAndExpireDate;
                this.bufferDays = this.bufferDays;
                // this.bidduedate = moment(this.bidlogindate)
                //     .add(this.bufferDays, 'days')
                //     .format('MM-DD-YYYY');
                this.bidService
                    .addDaysExcludingHolidaysAndWeekEnds(
                        this.bidlogindate,
                        this.bufferDays
                    )
                    .subscribe((res) => {
                        if (res && res.success && res.data) {
                            this.bidduedate = res.data;
                        }
                    });
            }
        });
    }

    ngOnDestroy(): void {
        this.titleService.setTitle(this.previousTitle); // Restore old title
    }

    onSelectJobNumber(e: any) {
        this.jobService.getJobByMaster(this.selectedSearchJob.jobKey).subscribe((res) => {
            if (res && res.success && res.data) {
                if (!isNullOrUndefined(res.data.pcS_SHOP)) {
                    this.projectService
                        .getProjectById(res.data.pcS_SHOP)
                        .subscribe((res) => {
                            if (res && res.success && res.data) {
                                this.selectedProject = {
                                    projectId: res.data.rec_id,
                                    subdivision: res.data.subdivision
                                };
                                this.createBidForm.patchValue({
                                    model_Info: res.data.subdivision
                                });
                                if (!isNullOrUndefinedOrEmpty(res.data.customer)) {
                                    this.projectService
                                        .getCustomerName(res.data.customer)
                                        .subscribe((res) => {
                                            if (res && res.success && res.data) {
                                                this.selectedCustomer = {
                                                    customerKey: res.data.cusT_KEY,
                                                    customerName: res.data.cusT_NAME
                                                };
                                            }
                                        });
                                }
                                if (!isNullOrUndefined(res.data.prj_contact)) {
                                    this.projectService
                                        .getContactById(res.data.prj_contact)
                                        .subscribe((res) => {
                                            if (res && res.success && res.data) {
                                                this.selectedcontact = {
                                                    last_Name:
                                                        res.data.first_Name +
                                                        ' ' +
                                                        res.data.last_Name,
                                                    rec_Id: res.data.rec_Id
                                                };
                                            }
                                        });
                                }
                            }
                        });
                }
                if (!isNullOrUndefined(res.data.joB_TYPE)) {
                    this.bidService.getJobType(res.data.joB_TYPE).subscribe((res) => {
                        if (res && res.success && res.data) {
                            this.selectedType = {
                                type: res.data?.type
                            };
                            this.selectedClassification = {
                                class: res.data?.class
                            };
                            this.createBidForm.patchValue({
                                product_type: res.data.joB_TYPE
                            });
                        }
                    });
                }
            }
        });
    }
    onClearJobNumber(e: any) {
        this.selectedCustomer = [];
        this.selectedcontact = [];
        this.selectedProject = [];
        this.selectedClassification = [];
        this.selectedType = [];
        this.createBidForm.patchValue({
            product_type: ''
        });
    }
    GenerateBidNumber() {
        this.bidService.getGenerateNumber().subscribe((res) => {
            if (res && res.success) {
                if (this.framing == true) {
                    if (this.editMode == true) {
                        this.createBidForm.patchValue({
                            bid_Number: 'BF' + res.data
                        });
                    } else {
                        this.selectedSearchJob = {
                            jobKey: 'BF' + res.data
                        };
                    }
                } else {
                    if (this.editMode == true) {
                        this.createBidForm.patchValue({
                            bid_Number: 'B' + res.data
                        });
                    } else {
                        this.selectedSearchJob = {
                            jobKey: 'B' + res.data
                        };
                    }
                }
            }
        });
    }
    initFormProject() {
        this.createprojectForm = this.fb.group({
            customerKey: [''],
            salesRepEmail: [''],
            subdivision: ['', [Validators.required, Validators.maxLength(64)]],
            job_Type: [''],
            notes: [''],
            city: [''],
            zip: ['', Validators.maxLength(5)],
            address1: [''],
            address2: [''],
            lat: ['', [Validators.pattern('^[0-9-+.]*$')]],
            long: ['', [Validators.pattern('^[0-9-+.]*$')]],
            active: ['']
        });
    }
    initFormcustomer() {
        this.createcustomerForm = this.fb.group({
            cusT_NAME: ['', [Validators.required, Validators.maxLength(64)]],
            cusT_KEY: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(25),
                    Validators.pattern('^[ A-Za-z0-9_@.!&-]*$')
                ]
            ],
            bilL_ADDR1: [''],
            bilL_ADDR2: [''],
            bilL_ADDR3: [''],
            cust_Active: false
        });
    }
    initFormContact() {
        this.createcontactForm = this.fb.group({
            rec_Id: [''],
            first_Name: ['', [Validators.required]],
            last_Name: ['', [Validators.required]],
            title: [''],
            email_Address: ['', [Validators.email, Validators.required]],
            office_Mobile: ['', Validators.minLength(14)],
            office_Phone: ['', Validators.minLength(14)],
            office_Fax: ['', Validators.minLength(14)],
            addr1: [''],
            addr2: [''],
            addr3: [''],
            c_comments: ['']
        });
    }
    initFormBid() {
        this.createBidForm = this.fb.group({
            model_Info: [''],
            bidNotes: [''],
            bid_Number: ['', [Validators.required]],
            product_type: [''],
            last_Name: [''],
            framing: [''],
            Bid_Units_Roof: ['', [Validators.pattern('^[0-9]*$')]],
            Design_Units_Roof: ['', [Validators.pattern('^[0-9]*$')]],
            Avg_Unit_Roof: ['', [Validators.pattern('^[0-9]*$')]],
            Total$: [''],
            amenities: ['', [Validators.pattern('^[0-9]*$')]],
            Bid_Bdft_Roof: ['', [Validators.pattern('^[0-9]*$')]],
            AvgCostBdft: [''],
            Total_Project: [''],
            FloorPSF: ['', [Validators.pattern('^[0-9]*$')]],
            RoofPSF: ['', [Validators.pattern('^[0-9]*$')]],
            WindLoading: [''],
            PlansBy: [''],
            FloorDepth: ['', [Validators.pattern('^[0-9]*$')]],
            FloorSpacing: ['', [Validators.pattern('^[0-9]*$')]],
            IndexAmount: ['', [Validators.pattern('^[0-9]*$')]],
            Bid_Comment: ['', [Validators.maxLength(255)]],
            Status_Comment: [''],
            label: [''],
            jobDir: [''],
            joB_REF2: ['']
        });

        this.createBidForm.controls['Avg_Unit_Roof'].valueChanges
            .pipe(distinctUntilChanged())
            .subscribe((value) => {
                const avgRoof = parseInt(this.createBidForm.get('Avg_Unit_Roof')?.value);
                const bidRoof = parseInt(this.createBidForm.get('Bid_Units_Roof')?.value);
                const bidboardroof = parseInt(
                    this.createBidForm.get('Bid_Bdft_Roof')?.value
                );
                const amenities = parseInt(this.createBidForm.get('amenities')?.value);
                this.createBidForm.controls['Total$'].patchValue(avgRoof * bidRoof);
                this.createBidForm.controls['AvgCostBdft'].patchValue(
                    avgRoof / bidboardroof
                );
                this.createBidForm.controls['Total_Project'].patchValue(
                    avgRoof * bidRoof + amenities
                );
            });

        this.createBidForm.controls['Bid_Bdft_Roof'].valueChanges
            .pipe(distinctUntilChanged())
            .subscribe((value) => {
                const avgRoof = parseInt(this.createBidForm.get('Avg_Unit_Roof')?.value);
                const bidboardroof = parseInt(
                    this.createBidForm.get('Bid_Bdft_Roof')?.value
                );
                this.createBidForm.controls['AvgCostBdft'].patchValue(
                    avgRoof / bidboardroof
                );
            });

        this.createBidForm.controls['amenities'].valueChanges
            .pipe(distinctUntilChanged())
            .subscribe((value) => {
                const avgRoof = parseInt(this.createBidForm.get('Avg_Unit_Roof')?.value);
                const bidRoof = parseInt(this.createBidForm.get('Bid_Units_Roof')?.value);
                const amenities = parseInt(this.createBidForm.get('amenities')?.value);
                this.createBidForm.controls['Total$'].patchValue(avgRoof * bidRoof);
                this.createBidForm.controls['Total_Project'].patchValue(
                    avgRoof * bidRoof + amenities
                );
            });

        this.createBidForm.controls['Bid_Units_Roof'].valueChanges
            .pipe(distinctUntilChanged())
            .subscribe((value) => {
                const avgRoof = parseInt(this.createBidForm.get('Avg_Unit_Roof')?.value);
                const bidRoof = parseInt(this.createBidForm.get('Bid_Units_Roof')?.value);
                const amenities = parseInt(this.createBidForm.get('amenities')?.value);
                this.createBidForm.controls['Total$'].patchValue(avgRoof * bidRoof);
                this.createBidForm.controls['Total_Project'].patchValue(
                    avgRoof * bidRoof + amenities
                );
                if (avgRoof / bidRoof == Infinity) {
                    this.createBidForm.controls['AvgCostBdft'].patchValue('0');
                } else {
                    this.createBidForm.controls['AvgCostBdft'].patchValue(
                        avgRoof / bidRoof
                    );
                }
            });
    }
    enableEditMode() {
        this.editMode = true;
        this.createBidForm.patchValue({
            bid_Number: this.selectedSearchJob.jobKey
        });
    }
    editedValue() {
        this.createBidForm.patchValue({
            bid_Number: this.createBidForm.value.bid_Number
        });
    }
    save() {
        this.editMode = false;
        this.selectedSearchJob = { jobKey: this.createBidForm.value.bid_Number };
        this.searchJobs = this.searchJobs.push(this.createBidForm.value.bid_Number);
    }
    onChangebidloginDate(e: any) {
        if (this.bidlogindate != null)
            // this.bidduedate = moment(this.bidlogindate)
            //     .add(this.bufferDays, 'days')
            //     .format('MM-DD-YYYY');
            this.bidlogindate = moment(this.bidlogindate).format('YYYY-MM-DD');
        this.bidService
            .addDaysExcludingHolidaysAndWeekEnds(this.bidlogindate, this.bufferDays)
            .subscribe((res) => {
                if (res && res.success && res.data) {
                    this.bidduedate = res.data;
                }
            });
        this.setDueDate = true;
    }

    onChangebiddueDate(e: any) {
        this.compareDates();
    }

    onChangeshipDate(e: any) {
        let minToDate = new Date();
        minToDate = moment(this.bidsubmitted).toDate();
        this.bidsubmitted = minToDate;
        this.onChangecloseDate(e);
    }

    onChangeProjectDate(e: any) {
        this.projectedEndDate = this.projectedEndDate;
        this.compareProjectDates();
    }
    compareProjectDates() {
        if (this.projectedEndDate < this.projectedStartDate) {
            this.errorProject = {
                isProjectError: true,
                errorMessage: 'End Date should be > Start Date'
            };
        } else {
            this.errorProject = {
                isProjectError: false
            };
        }
    }
    getBillToCustomers() {
        return this.projectService.getBillToCustomers();
    }
    getBillToCustomerOptionLabelFn(item: any) {
        return item.cusT_NAME;
    }
    getBillToTrackByFn(item: any) {
        return item.defaultBid;
    }

    onClearProjectClassification(item: any) {
        this.createprojectForm.patchValue({
            job_Type: ''
        });
    }
    onClearProjectType(item: any) {
        this.createprojectForm.patchValue({
            job_Type: ''
        });
    }

    onSelectProjectJobType(e: any) {
        this.selectedProjectClassification = [];
        this.loadProjectClassificationOptions();
    }

    onSelectProjectClassification(e: any) {
        this.bidService
            .generateJobType(
                this.selectedProjectType.type,
                this.selectedProjectClassification.class
            )
            .subscribe((res) => {
                if (res && res.success && res.data) {
                    this.createprojectForm.patchValue({
                        job_Type: res.data.joB_TYPE
                    });
                }
            });
    }

    loadProjectClassificationOptions() {
        this.jobClassificationOptions$ = concat(
            this.getClassification(this.selectedProjectType.type).pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.jobClassificationOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.jobClassificationOptionsLoading = true)),
                switchMap((term) => {
                    return this.getClassification(this.selectedProjectType.type).pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.jobClassificationOptionsLoading = false))
                    );
                })
            )
        );
    }

    onChangecloseDate(e: any) {
        let minTonewDate = new Date();
        minTonewDate = moment(this.bidsubmitted).toDate();
        this.bidsubmitted = minTonewDate;
        let endDatenew = new Date();
        endDatenew = moment(this.bidclosingdate).toDate();
        this.bidclosingdate = endDatenew;
        this.compareShipDates();
    }

    compareDates() {
        //  this.bidlogindate = moment(this.bidlogindate).toDate();
        if (this.bidduedate < this.bidlogindate) {
            this.error = {
                isError: true,
                errorMessage: 'Due Date should be > Login Date'
            };
        } else {
            this.error = {
                isError: false
            };
        }
    }

    compareShipDates() {
        if (this.bidclosingdate < this.bidsubmitted) {
            this.error1 = {
                isError1: true,
                errorMessage: 'Closing Date should be > Submitted Date'
            };
        } else {
            this.error1 = {
                isError1: false
            };
        }
    }

    public onCheckedFraming(value: boolean) {
        this.framing = value;
        this.bidService.getGenerateNumber().subscribe((res) => {
            if (res && res.success) {
                if (this.framing == true) {
                    if (this.editMode == true) {
                        this.createBidForm.patchValue({
                            bid_Number: 'BF' + res.data
                        });
                    } else {
                        this.selectedSearchJob = {
                            jobKey: 'BF' + res.data
                        };
                    }
                } else {
                    if (this.editMode == true) {
                        this.createBidForm.patchValue({
                            bid_Number: 'B' + res.data
                        });
                    } else {
                        this.selectedSearchJob = {
                            jobKey: 'B' + res.data
                        };
                    }
                }
            }
        });
    }

    onSelectProject(e: any) {
        this.selectedcontact = [];
        this.contact = true;
        this.createBidForm.patchValue({
            last_Name: ' '
        });
        this.createBidForm.patchValue({
            model_Info: this.selectedProject.subdivision
        });
        this.projectService
            .getProjectById(this.selectedProject.projectId)
            .subscribe((res) => {
                if (res && res.success && res.data) {
                    if (res.data.prj_contact == null) {
                        this.contact = false;
                    } else {
                        if (!isNullOrUndefined(res.data.prj_contact)) {
                            this.projectService
                                .getContactById(res.data.prj_contact)
                                .subscribe((res) => {
                                    if (res && res.success && res.data) {
                                        this.selectedcontact = {
                                            rec_Id: res.data.rec_Id,
                                            last_Name:
                                                res.data.first_Name +
                                                ' ' +
                                                res.data.last_Name
                                        };
                                    }
                                });
                        }
                    }
                }
            });
    }

    onSelectNote(e: any) {
        this.bidService.getNote(this.StdNotesSelected.code).subscribe((res) => {
            if (res && res.success && res.data) {
                this.note = res.data.description;
                this.SelectedNotes.push(res.data.description);
                this.noteappend = this.SelectedNotes.join('\n');
                this.createBidForm.patchValue({
                    bidNotes: this.noteappend
                });
            }
        });
    }

    onClearNote(item: any) {
        this.SelectedNotes = [];
        this.createBidForm.patchValue({
            bidNotes: ''
        });
    }
    onClearProject(item: any) {
        this.selectedcontact = [];
        this.createBidForm.patchValue({
            model_Info: '',
            last_Name: ''
        });
        this.contact = false;
        this.loadContactOptions();
    }
    onSelectJobType(e: any) {
        this.selectedClassification = [];
        this.loadClassificationOptions();
    }
    onSelectClassification(e: any) {
        this.bidService
            .generateJobType(this.selectedType.type, this.selectedClassification.class)
            .subscribe((res) => {
                if (res && res.success && res.data) {
                    this.createBidForm.patchValue({
                        product_type: res.data.joB_TYPE
                    });
                }
            });
    }
    loadClassificationOptions() {
        this.jobClassificationOptions$ = concat(
            this.getClassification(this.selectedType.type).pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.jobClassificationOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.jobClassificationOptionsLoading = true)),
                switchMap((term) => {
                    return this.getClassification(this.selectedType.type).pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.jobClassificationOptionsLoading = false))
                    );
                })
            )
        );
    }
    onClearClassification(item: any) {
        this.createBidForm.patchValue({
            product_type: ''
        });
    }
    onClearType(item: any) {
        this.createBidForm.patchValue({
            product_type: ''
        });
    }
    getbidStatus(rowData: Project) {
        return !isNullOrUndefined(rowData.active_status)
            ? rowData.active_status
            : 'Not specified';
    }
    onClickPlus() {
        if (this.selectedCustomer == null) {
            this.toastr.error('Please select customer key before creating the contact');
            return;
        }
        this.submittedContact = false;
        this.createcontactForm.reset();
        this.selectedDefaultContact = [];
        this.AddContact = true;
    }
    onClickCancel() {
        this.createcontactForm.reset();
        this.selectedDefaultContact = [];
        this.AddContact = false;
    }
    onClickProject() {
        if (this.selectedCustomer == null) {
            this.toastr.error('Please select customer key before creating the project');
            return;
        }
        const previouslySelected = this.selectedPlantLocation;

        this.createprojectForm.reset();
        this.createprojectForm.patchValue({
            customerKey: this.selectedCustomer.customerKey
        });
        this.selectedcounty = [];
        this.selectedstate = [];
        this.selectedsalesRep = [];
        this.selectedprojectStatus = [];
        // this.projectedStartDate = '';
        // this.projectedEndDate = '';
        this.selectedBillToCustomer = {
            cusT_NAME: this.selectedCustomer.customerName,
            cusT_KEY: this.selectedCustomer.customerKey
        };
        this.selectedProjectType = [];
        this.selectedProjectClassification = [];
        this.submittedProject = false;
        this.AddProject = true;

        setTimeout(() => {
            this.selectedPlantLocation = previouslySelected;
        }, 200);
    }
    onClickProjectCancel() {
        this.createprojectForm.reset();
        this.selectedcounty = [];
        this.selectedstate = [];
        this.selectedsalesRep = [];
        this.selectedprojectStatus = [];
        this.selectedProjectPlantLocation = [];
        this.AddProject = false;
    }
    onRemoveCustomerItem(item: any) {
        this.selectedCustomer = this.selectedCustomer.filter(
            (e: any) => e.customerKey !== item.customerKey
        );
    }
    onSelectadditionalCustomer(e: any) {
        this.additionalCustomer = this.SelectedAdditionalCustomer.map(
            (i: any) => i['customerKey']
        );
    }
    onClearCustomer(e: any) {
        this.selectedProject = [];
        this.selectedcontact = [];
        this.createBidForm.patchValue({
            model_Info: '',
            last_Name: ''
        });
    }
    onKeyUpEvent(event: any, fieldName: any) {
        const num = event.target.value.replace(/\D/g, '');
        let item;
        if (num != '') {
            item =
                '(' +
                num.substring(0, 3) +
                ')' +
                '-' +
                num.substring(3, 6) +
                '-' +
                num.substring(6, 10);
        }

        if (fieldName == 'Mobile') {
            this.createcontactForm.controls['office_Mobile'].setValue(item);
        } else if (fieldName == 'Phone') {
            this.createcontactForm.controls['office_Phone'].setValue(item);
        } else {
            this.createcontactForm.controls['office_Fax'].setValue(item);
        }
    }
    onClickCustomer() {
        this.submittedCustomer = false;
        this.AddCustomer = true;
        this.createcustomerForm.reset();
        this.initFormcustomer();
        this.selectedSalesRep = [];
        this.selectedCustomerStatus = { custStatus: this.active };
        this.selectedterms = [];
    }
    onClickCustomerCancel() {
        this.createcustomerForm.reset();
        this.selectedSalesRep = [];
        this.selectedCustomerStatus = [];
        this.selectedterms = [];
        this.AddCustomer = false;
    }
    get lf(): { [key: string]: AbstractControl } {
        return this.createcustomerForm.controls;
    }
    get lfProject(): { [key: string]: AbstractControl } {
        return this.createprojectForm.controls;
    }
    get lfBid(): { [key: string]: AbstractControl } {
        return this.createBidForm.controls;
    }
    successmsg(msg: any) {
        this.toastr.success(msg);
    }
    statusTrackByFn(item: any) {
        return item.customerKey;
    }
    onSelectCustomer(e: any) {
        this.loadProjectOptions();
        this.loadContactOptions();
        this.selectedProject = [];
        this.selectedcontact = [];
        this.createBidForm.patchValue({
            last_Name: '',
            model_Info: ''
        });
    }
    onSelectProjectCustomer(e: any) {
        this.projectService
            .getCustomerContact(this.selectedCustomer.customerKey)
            .subscribe((res) => {
                if (res && res.success && res.data) {
                }
            });
    }

    onSelectstate(e: any) {
        this.selectedcounty = [];
        this.loadCountyOptions();
    }
    onSelectSalesRep(e: any) {
        this.projectService
            .getSalesRepEmail(this.selectedsalesRep.smaN_KEY)
            .subscribe((res) => {
                if (res && res.success && res.data) {
                    this.createprojectForm.patchValue({
                        salesRepEmail: res.data.eMail
                    });
                }
            });
    }

    onSelectCounty(e: any) {
        const state = this.selectedstate.state;
        const county = this.selectedcounty.county;
        this.projectService.getStateById(state, county).subscribe((res) => {
            if (res && res.success && res.data) {
                this.stateId = res.data.rec_ID;
            }
        });
    }
    loadCountyOptions() {
        const county = this.selectedstate.state;
        this.countyOptions$ = concat(
            this.getCountyByState(county).pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.countyOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.countyOptionsLoading = true)),
                switchMap((term) => {
                    return this.getCountyByState(county).pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.countyOptionsLoading = false))
                    );
                })
            )
        );
    }

    loadContactOptions() {
        const contact = this.selectedCustomer.customerKey;
        this.contactOptions$ = concat(
            this.getContact(contact).pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.countyOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.contactOptionsLoading = true)),
                switchMap((term) => {
                    return this.getContact(contact).pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.contactOptionsLoading = false))
                    );
                })
            )
        );
    }
    stateTrackByFn(item: any) {
        return item.state;
    }
    customerTrackByFn(item: any) {
        return item.customerKey;
    }

    getCustomerOptionLabelFn(item: any) {
        return item.customerKey;
    }
    countyTrackByFn(item: any) {
        return item.county;
    }
    getstateOptionLabelFn(item: any) {
        return item.state;
    }
    contactTrackByFn(item: any) {
        return item.customerKey;
    }
    salesRepTrackByFn(item: any) {
        return item.smaN_NAME;
    }
    getcountyOptionLabelFn(item: any) {
        return item.county;
    }

    getcontactOptionLabelFn(item: any) {
        return item.last_Name;
    }
    getSalesRepOptionLabelFn(item: any) {
        return item.smaN_NAME;
    }

    plantLocationTrackByFn(item: Location) {
        return item.locationId;
    }

    getPlantLocationOptionLabelFn(item: Location) {
        return item.locationName;
    }

    projectCountyTrackByFn(item: any) {
        return item.rec_ID;
    }
    projectTrackByFn(item: any) {
        return item.projectId;
    }

    getProjectOptionLabelFn(item: any) {
        return item.subdivision;
    }
    getCustomerProjectOptionLabelFn(item: any) {
        return item.subdivision;
    }
    getProjectCountyOptionLabelFn(item: any) {
        return item.subdivision;
    }
    onFilterTypeValueChanged(e: any) {
        this.selectedFilterType = e.value;
        if (this.selectedFilterType === 0) {
            this.selectedCustomer = null;
        } else if (this.selectedFilterType === 1) {
            this.selectedProject = null;
        } else {
            this.selectedCustomer = null;
            this.selectedProject = null;
        }
    }
    getCustomerOptions(searchTerm?: string) {
        const query: GetCustomerOptionsRequest = {
            limit: 100,
            showActiveCustomers: true,
            showTargetCustomers: true,
            showInActiveCustomers: true
        };
        if (searchTerm) {
            query.customerKey = searchTerm;
        }
        return this.forecastingService.getCustomerOptions(query);
    }

    getSalesRep() {
        return this.projectService.getSalesRep();
    }

    getAllStates() {
        return this.projectService.getAllStates();
    }

    getAllActiveStatus() {
        return this.projectService.getAllActiveStatus();
    }

    getCountyByState(state: string) {
        return this.projectService.getCountystate(state);
    }

    getContact(name: string) {
        return this.projectService.getContact(name);
    }

    onSubmitProject() {
        this.submittedProject = true;
        if (
            this.createprojectForm.value.active == '' ||
            this.createprojectForm.value.active == null
        ) {
            this.createprojectForm.value.active = false;
        } else {
            this.createprojectForm.value.active = true;
        }
        if (this.createprojectForm.invalid) {
            return;
        }
        if (
            (this.submittedProject && !this.selectedstate) ||
            (this.submittedProject && this.selectedstate.length == 0) ||
            (this.submittedProject && !this.selectedProjectType) ||
            (this.submittedProject && this.selectedProjectType?.length == 0) ||
            (this.submittedProject && !this.selectedProjectClassification) ||
            (this.submittedProject && this.selectedProjectClassification?.length == 0)
        ) {
            return;
        }
        if (
            (this.submittedProject && !this.selectedcounty) ||
            (this.submittedProject && this.selectedcounty.length == 0)
        ) {
            return;
        }
        if (
            (this.submittedProject && !this.selectedsalesRep) ||
            (this.submittedProject && this.selectedsalesRep.length == 0)
        ) {
            return;
        }
        if (
            (this.submittedProject && !this.selectedprojectStatus) ||
            (this.submittedProject && this.selectedprojectStatus.length == 0)
        ) {
            return;
        }
        if (this.projectedEndDate != null && this.projectedEndDate != '') {
            if (this.projectedEndDate < this.projectedStartDate) {
                return;
            }
        }
        if (!this.selectedProjectPlantLocation?.locationName) {
            return;
        }
        const {
            subdivision,
            job_Type,
            notes,
            city,
            zip,
            address1,
            address2,
            lat,
            long,
            active
        } = this.createprojectForm.value;
        const customer = this.selectedCustomer.customerKey;
        const county = this.selectedcounty.county;
        const salesRep = this.selectedsalesRep.smaN_KEY;
        const active_status = this.selectedprojectStatus.activestatus;
        const surtaxCountyId = this.stateId;
        const prj_email = this.createprojectForm.value.salesRepEmail;
        const delv_contact = this.selectedsalesRep.smaN_KEY;
        const prj_contact = '';
        const Prj_Fax = '';
        const Prj_flags = '';
        const planT_LOC = this.selectedProjectPlantLocation.locationName;
        let billto;
        if (!this.selectedBillToCustomer) {
            billto = null;
        } else {
            billto = this.selectedBillToCustomer.cusT_KEY;
        }
        let projectedStart;
        if (this.projectedStartDate == '') {
            projectedStart = null;
        } else {
            projectedStart = this.projectedStartDate;
        }
        let projectedEnd;
        if (this.projectedEndDate == '') {
            projectedEnd = null;
        } else {
            projectedEnd = this.projectedEndDate;
        }
        // let lat;
        // if (this.lat == '') {
        //     lat = null;
        // } else {
        //     lat = this.lat;
        // }
        // let long;
        // if (this.long == '') {
        //     long = null;
        // } else {
        //     long = this.long;
        // }
        const reqData: AddBidProject = {
            customer,
            subdivision,
            county,
            salesRep,
            active_status,
            surtaxCountyId,
            prj_email,
            delv_contact,
            prj_contact,
            billto,
            projectedStart,
            projectedEnd,
            job_Type,
            notes,
            Prj_flags,
            Prj_Fax,
            city,
            zip,
            address1,
            address2,
            lat,
            long,
            planT_LOC,
            active
        };
        this.projectService.createBidProject(reqData).subscribe((res) => {
            if (res && res.success) {
                this.successmsg('Project is Created');
                this.newProjectID = res.data?.rec_id;
                this.newProjectName = res.data?.subdivision;
                this.newProjectAdded = true;
                this.projectName = res.data?.subdivision;
                this.AddProject = false;
                this.selectedProject = {
                    projectId: res.data?.rec_id,
                    subdivision: res.data?.subdivision
                };
                this.selectedcontact = [];
                this.createBidForm.patchValue({
                    model_Info: this.projectName
                });
                this.selectedType = this.selectedProjectType;
                this.selectedClassification = this.selectedProjectClassification;
                this.createBidForm.patchValue({
                    product_type: this.createprojectForm.value.job_Type
                });
                this.loadProjectOptions();
                this.projectService
                    .getProjectById(this.selectedProject.projectId)
                    .subscribe((res) => {
                        if (res && res.success && res.data) {
                            this.projectService
                                .getContactById(res.data.prj_contact)
                                .subscribe((res) => {
                                    if (res && res.success && res.data) {
                                        this.createBidForm.patchValue({
                                            last_Name:
                                                res.data.first_Name +
                                                ' ' +
                                                res.data.last_Name
                                        });
                                    }
                                });
                            this.createBidForm.patchValue({
                                model_Info: res.data.subdivision
                            });
                        }
                    });
            }
        });
    }
    getstatusOptionLabelFn(item: any) {
        return item.custStatus;
    }

    getprojectstatusOptionLabelFn(item: any) {
        return item.activestatus;
    }
    gettermsOptionLabelFn(item: any) {
        return item.cusT_TERM_DESC;
    }
    OnsubmitCustomer() {
        this.submittedCustomer = true;
        if (this.createcustomerForm.invalid) {
            return;
        }
        if (
            (this.submittedCustomer && !this.selectedSalesRep) ||
            (this.submittedCustomer && this.selectedSalesRep.length == 0)
        ) {
            return;
        }
        if (
            (this.submittedCustomer && !this.selectedterms) ||
            (this.submittedCustomer && this.selectedterms.length == 0)
        ) {
            return;
        }
        const { cusT_NAME, cusT_KEY, bilL_ADDR1, bilL_ADDR2, bilL_ADDR3, cust_Active } =
            this.createcustomerForm.value;
        const cusT_SMAN_KEY = this.selectedSalesRep.smaN_KEY;
        const cust_status = this.selectedCustomerStatus.custStatus;
        const cusT_TERMS = this.selectedterms.cusT_TERM_CODE;
        const reqData: CreateCustomer = {
            cusT_NAME,
            cusT_KEY,
            bilL_ADDR1,
            bilL_ADDR2,
            bilL_ADDR3,
            cusT_SMAN_KEY,
            cust_Active,
            cusT_TERMS,
            cust_status
        };
        this.customerService.createCustomer(reqData).subscribe((res) => {
            if (res && res.success) {
                this.successmsg('Customer is Created');
                this.AddCustomer = false;
                this.selectedCustomer = {
                    customerKey: res.data?.cusT_KEY,
                    customerName: res.data?.cusT_NAME
                };
                this.loadProjectOptions();
                this.loadContactOptions();
                this.selectedProject = [];
                this.selectedcontact = [];
            }
        });
    }
    get lfContact(): { [key: string]: AbstractControl } {
        return this.createcontactForm.controls;
    }
    OnsubmitContact() {
        this.submittedContact = true;
        if (this.createcontactForm.invalid) {
            return;
        }
        const {
            first_Name,
            last_Name,
            title,
            email_Address,
            office_Mobile,
            office_Phone,
            office_Fax,
            addr1,
            addr2,
            addr3,
            c_comments
        } = this.createcontactForm.value;
        const rec_Id = this.route.snapshot.params['rec_Id'];
        const cust_Key = this.selectedCustomer.customerKey;
        const defaults = this.selectedDefaultContact.map((i: any) => i['defaultBid']);
        {
            const reqData: createBidContact = {
                rec_Id,
                cust_Key,
                first_Name,
                last_Name,
                title,
                defaults,
                email_Address,
                office_Mobile,
                office_Phone,
                office_Fax,
                addr1,
                addr2,
                addr3,
                c_comments
            };
            this.bidService.createContact(reqData).subscribe((res) => {
                if (res && res.success && res.data) {
                    this.successmsg('Contact is Created');
                    this.contactName = res.data?.first_Name + ' ' + res.data?.last_Name;
                    this.AddContact = false;
                    this.selectedcontact = {
                        last_Name: this.contactName
                    };
                    this.loadContactOptions();
                    this.selectedcontact.rec_Id = res.data?.rec_Id;
                    const recId = 0;
                    const title = res.data.title;
                    const data: TitleType = {
                        recId,
                        title
                    };
                    if (!isNullOrUndefinedOrEmpty(res.data.title)) {
                        this.contactService.addTitle(data).subscribe((res) => {
                            if (res && res.success && res.data) {
                                this.successmsg('Title is added Successfully');
                            }
                        });
                    }
                }
            });
        }
    }

    OnsubmitBid() {
        this.submittedBid = true;
        if (
            this.createBidForm.value.Bid_Units_Roof &&
            this.createBidForm.value.Design_Units_Roof &&
            this.createBidForm.value.Avg_Unit_Roof &&
            this.createBidForm.value.amenities &&
            this.createBidForm.value.Bid_Bdft_Roof &&
            this.createBidForm.value.FloorPSF &&
            this.createBidForm.value.RoofPSF &&
            this.createBidForm.value.FloorDepth &&
            this.createBidForm.value.FloorSpacing &&
            this.createBidForm.value.IndexAmount &&
            this.createBidForm.value.Bid_Comment
        ) {
            return;
        }
        if (
            (this.submittedBid && !this.selectedType) ||
            (this.submittedBid && this.selectedType.length == 0) ||
            (this.submittedBid && !this.selectedClassification) ||
            (this.submittedBid && this.selectedClassification.length == 0)
        ) {
            return;
        }
        if (this.bidduedate < this.bidlogindate) {
            this.toastr.error('Bid Due Date should be greater than Login Date');
            return;
        }
        if (
            (this.submittedBid && !this.selectedProject) ||
            (this.submittedBid && this.selectedProject.length == 0)
        ) {
            return;
        }
        if (
            (this.submittedBid && !this.selectedcontact) ||
            (this.submittedBid && this.selectedcontact.length == 0)
        ) {
            return;
        }
        if (!this.selectedPlantLocation?.locationName) {
            return;
        }
        if (!this.FloorSizeSelected) {
            var FloorSize = null;
        } else {
            var FloorSize = this.FloorSizeSelected.FloorSize;
        }
        if (!this.HipCatsSelected) {
            var HipCats = null;
        } else {
            var HipCats = this.HipCatsSelected.HipCats;
        }
        if (!this.BiddingMethodSelected) {
            var bid_method = null;
        } else {
            var bid_method = this.BiddingMethodSelected.bid_method;
        }
        if (!this.SeatPlatesSelected) {
            var SeatPlates = null;
        } else {
            var SeatPlates = this.SeatPlatesSelected.SeatPlates;
        }
        if (!this.BeamsSelected) {
            var Beams = null;
        } else {
            var Beams = this.BeamsSelected.Beams;
        }
        if (!this.LevelReturnsSelected) {
            var LevelReturns = null;
        } else {
            var LevelReturns = this.LevelReturnsSelected.LevelReturns;
        }
        if (!this.selectedSearchJob) {
            var jobKey = null;
        } else {
            var jobKey = this.selectedSearchJob.jobKey;
        }
        var bid_Number;
        if (!bid_Number) {
            var bid_Number = this.selectedSearchJob.jobKey;
        } else {
            var bid_Number = this.createBidForm.value.bid_Number;
        }
        const rec_Id = this.route.snapshot.params['rec_Id'];
        const project_Id = this.selectedProject.projectId;
        const bid_type = this.bidTypeSelected.bidType;
        const bid_status = this.bidSelectedstatus.bidStatus;
        const bid_Custkey = this.additionalCustomer;
        const product_line = this.ProductLineSelected.productLine;
        // const bid_Number=this.selectedSearchJob.jobKey;
        const {
            bidNotes,
            model_Info,
            product_type,
            Status_Comment,
            WindLoading,
            PlansBy,
            Bid_Comment,
            jobDir,
            joB_REF2
        } = this.createBidForm.value;
        if (this.createBidForm.value.FloorPSF == '') {
            var FloorPSF = null;
        } else {
            var FloorPSF = this.createBidForm.value.FloorPSF;
        }
        if (this.createBidForm.value.Bid_Units_Roof == '') {
            var Bid_Units_Roof = null;
        } else {
            var Bid_Units_Roof = this.createBidForm.value.Bid_Units_Roof;
        }
        if (this.createBidForm.value.Design_Units_Roof == '') {
            var Design_Units_Roof = null;
        } else {
            var Design_Units_Roof = this.createBidForm.value.Design_Units_Roof;
        }
        //Avg_Unit_Roof
        if (this.createBidForm.value.Avg_Unit_Roof == '') {
            var Avg_Unit_Roof = null;
        } else {
            var Avg_Unit_Roof = this.createBidForm.value.Avg_Unit_Roof;
        }
        //Bid_Bdft_Roof

        if (this.createBidForm.value.Bid_Bdft_Roof == '') {
            var Bid_Bdft_Roof = null;
        } else {
            var Bid_Bdft_Roof = this.createBidForm.value.Bid_Bdft_Roof;
        }
        //amenities
        if (this.createBidForm.value.amenities == '') {
            var amenities = null;
        } else {
            var amenities = this.createBidForm.value.amenities;
        }
        //RoofPSF
        if (this.createBidForm.value.RoofPSF == '') {
            var RoofPSF = null;
        } else {
            var RoofPSF = this.createBidForm.value.RoofPSF;
        }
        //FloorDepth
        if (this.createBidForm.value.FloorDepth == '') {
            var FloorDepth = null;
        } else {
            var FloorDepth = this.createBidForm.value.FloorDepth;
        }
        //FloorSpacing
        if (this.createBidForm.value.FloorSpacing == '') {
            var FloorSpacing = null;
        } else {
            var FloorSpacing = this.createBidForm.value.FloorSpacing;
        }
        //IndexAmount
        if (this.createBidForm.value.IndexAmount == '') {
            var IndexAmount = null;
        } else {
            var IndexAmount = this.createBidForm.value.IndexAmount;
        }

        const PLANT_LOC = this.selectedPlantLocation.locationName;
        const bid_login_date = this.bidlogindate;
        const bid_expire_date = this.bidduedate;
        const IndexDate = this.indexdate;
        const Bid_end_date = this.bidclosingdate;
        const Bid_Submitted = this.bidsubmitted;
        const PlansDate = this.plansdate;
        const prj_contact = this.selectedcontact.rec_Id;
        const reqData: AddCreateBid = {
            project_Id,
            bid_type,
            bid_status,
            bid_login_date,
            bid_expire_date,
            bidNotes,
            bid_Number,
            PLANT_LOC,
            product_type,
            bid_Custkey,
            product_line,
            model_Info,
            prj_contact,
            FloorPSF,
            FloorSize,
            Bid_Comment,
            Status_Comment,
            Bid_Units_Roof,
            Design_Units_Roof,
            Avg_Unit_Roof,
            Bid_Bdft_Roof,
            amenities,
            RoofPSF,
            WindLoading,
            PlansBy,
            FloorDepth,
            FloorSpacing,
            IndexAmount,
            HipCats,
            bid_method,
            SeatPlates,
            Beams,
            LevelReturns,
            IndexDate,
            PlansDate,
            Bid_Submitted,
            Bid_end_date,
            jobDir,
            joB_REF2,
            jobKey
        };
        this.bidService.createBid(reqData).subscribe((res) => {
            if (res && res.success) {
                this.successmsg('Bid is Created');
                const ID = res.data?.rec_Id;
                this.router.navigate(['/bid/edit-bid', ID], { fragment: 'Bid-Info' });
            } else {
                if (res && res.message) this.toastr.error(res.message);
                if (this.newProjectAdded == true) {
                    const proj_id = this.newProjectID;
                    const projectName = this.newProjectName;
                    document.documentElement.style.overflow = 'hidden';
                    confirm(
                        'Do you want to delete the new project' +
                            projectName +
                            ' created?',
                        'Warning'
                    ).then((res: boolean) => {
                        if (res == true) {
                            this.bidService.deleteProjectBid(proj_id).subscribe((res) => {
                                if (res && res.success) {
                                    this.successmsg('Project is deleted');
                                    this.router.navigate(['/bid/list-bids']);
                                }
                            });
                        } else {
                            document.documentElement.style.overflow = 'auto';
                        }
                    });
                }
            }
        });
    }

    getDefaultContacts() {
        return this.contactService.getDefaultContacts();
    }
    getDefaultContactOptionLabelFn(item: any) {
        return item.defaultBid;
    }
    defaultContactTrackByFn(item: any) {
        return item.defaultBid;
    }
    getBidStatus() {
        return this.bidService.getBidStatus();
    }
    bidStatusTrackByFn(item: any) {
        return item.bidStatus;
    }
    getbidStatusOptionLabelFn(item: any) {
        return item.bidStatus;
    }
    getJobTypeClassification() {
        return this.bidService.getJobTypeClassification();
    }
    jobTypeTrackByFn(item: any) {
        return item.type;
    }
    getJobTypeOptionLabelFn(item: any) {
        return item.type;
    }
    getClassification(type: any) {
        return this.bidService.getClassification(type);
    }
    jobClassificationTrackByFn(item: any) {
        return item.class;
    }
    getJobClassificationOptionLabelFn(item: any) {
        return item.class;
    }
    getBidType() {
        return this.bidService.getBidType('new');
    }
    bidTypeTrackByFn(item: any) {
        return item.bidType;
    }
    getBidTypeOptionLabelFn(item: any) {
        return item.bidType;
    }
    getProductLine() {
        return this.bidService.getProductLine();
    }
    getBeams() {
        return this.bidService.getBeams();
    }
    getFloorSize() {
        return this.bidService.getFloorSize();
    }
    getBiddingMethod() {
        return this.bidService.getBiddingMethod();
    }
    getLevelReturns() {
        return this.bidService.getLevelReturns();
    }
    getSeatPlates() {
        return this.bidService.getSeatPlates();
    }
    getHipCats() {
        return this.bidService.getHipCats();
    }
    getStdNotes() {
        return this.bidService.getStdNotes();
    }

    ProductLineTrackByFn(item: any) {
        return item.productLine;
    }
    BeamsTrackByFn(item: any) {
        return item.Beams;
    }
    FloorSizeTrackByFn(item: any) {
        return item.FloorSize;
    }
    BiddingMethodTrackByFn(item: any) {
        return item.BiddingMethod;
    }
    LevelReturnsTrackByFn(item: any) {
        return item.LevelReturns;
    }
    SeatPlatesTrackByFn(item: any) {
        return item.SeatPlates;
    }
    HipCatsTrackByFn(item: any) {
        return item.HipCats;
    }
    StdNotesTrackByFn(item: any) {
        return item.StdNotes;
    }
    getProductLineOptionLabelFn(item: any) {
        return item.productLine;
    }
    getBeamsOptionLabelFn(item: any) {
        return item.Beams;
    }
    getFloorSizeOptionLabelFn(item: any) {
        return item.FloorSize;
    }
    getBiddingMethodOptionLabelFn(item: any) {
        return item.BiddingMethod;
    }
    getLevelReturnsOptionLabelFn(item: any) {
        return item.LevelReturns;
    }
    getSeatPlatesOptionLabelFn(item: any) {
        return item.SeatPlates;
    }
    getHipCatsOptionLabelFn(item: any) {
        return item.HipCats;
    }
    getStdNotesOptionLabelFn(item: any) {
        return item.StdNotes;
    }
    getSearchJob(searchTerm?: string) {
        const query: GetBidJob = {
            limit: 10
        };
        if (searchTerm) {
            query.jobKey = searchTerm;
        }
        return this.bidService.getOrphanJobs(query);
    }
    getSearchJobTrackByFn(item: any) {
        return item.jobKey;
    }
    getSearchJobOptionLabelFn(item: any) {
        return item.jobKey;
    }
    loadOptions() {
        this.searchJobOptions$ = concat(
            this.getSearchJob().pipe(
                map((res: any) => {
                    this.searchJobs = res.data;
                    this.searchJobs.push({ jobKey: this.selectedSearchJob.JobKey });
                    return this.searchJobs;
                }),
                catchError(() => of([]))
            ),
            this.searchJobOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.searchJobOptionsLoading = true)),
                switchMap((term) => {
                    return this.getSearchJob(term).pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.searchJobOptionsLoading = false))
                    );
                })
            )
        );
        this.jobTypeOptions$ = concat(
            this.getJobTypeClassification().pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.jobTypeOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.jobTypeOptionsLoading = true)),
                switchMap((term) => {
                    return this.getJobTypeClassification().pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.jobTypeOptionsLoading = false))
                    );
                })
            )
        );

        this.billToCustomerOptions$ = concat(
            this.getBillToCustomers().pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.billToCustomerOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.billToCustomerOptionsLoading = true)),
                switchMap((term) => {
                    return this.getBillToCustomers().pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.billToCustomerOptionsLoading = false))
                    );
                })
            )
        );

        this.projectStatusOptions$ = concat(
            this.getAllActiveStatus().pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.projectStatusOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.projectStatusOptionsLoading = true)),
                switchMap((term) => {
                    return this.getAllActiveStatus().pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.projectStatusOptionsLoading = false))
                    );
                })
            )
        );
        this.bidStatusOptions$ = concat(
            this.getBidStatus().pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.bidStatusOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.bidStatusOptionsLoading = true)),
                switchMap((term) => {
                    return this.getBidStatus().pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.bidStatusOptionsLoading = false))
                    );
                })
            )
        );

        this.ProductLineOptions$ = concat(
            this.getProductLine().pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.ProductLineOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.ProductLineOptionsLoading = true)),
                switchMap((term) => {
                    return this.getProductLine().pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.ProductLineOptionsLoading = false))
                    );
                })
            )
        );
        this.BeamsOptions$ = concat(
            this.getBeams().pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.BeamsOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.BeamsOptionsLoading = true)),
                switchMap((term) => {
                    return this.getBeams().pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.BeamsOptionsLoading = false))
                    );
                })
            )
        );

        this.BiddingMethodOptions$ = concat(
            this.getBiddingMethod().pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.BiddingMethodOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.BiddingMethodOptionsLoading = true)),
                switchMap((term) => {
                    return this.getBiddingMethod().pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.BiddingMethodOptionsLoading = false))
                    );
                })
            )
        );
        this.LevelReturnsOptions$ = concat(
            this.getLevelReturns().pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.LevelReturnsOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.LevelReturnsOptionsLoading = true)),
                switchMap((term) => {
                    return this.getLevelReturns().pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.LevelReturnsOptionsLoading = false))
                    );
                })
            )
        );
        this.SeatPlatesOptions$ = concat(
            this.getSeatPlates().pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.SeatPlatesOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.SeatPlatesOptionsLoading = true)),
                switchMap((term) => {
                    return this.getSeatPlates().pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.SeatPlatesOptionsLoading = false))
                    );
                })
            )
        );
        this.HipCatsOptions$ = concat(
            this.getHipCats().pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.HipCatsOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.HipCatsOptionsLoading = true)),
                switchMap((term) => {
                    return this.getHipCats().pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.HipCatsOptionsLoading = false))
                    );
                })
            )
        );
        this.StdNotesOptions$ = concat(
            this.getStdNotes().pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.StdNotesOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.StdNotesOptionsLoading = true)),
                switchMap((term) => {
                    return this.getStdNotes().pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.StdNotesOptionsLoading = false))
                    );
                })
            )
        );
        this.FloorSizeOptions$ = concat(
            this.getFloorSize().pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.FloorSizeOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.FloorSizeOptionsLoading = true)),
                switchMap((term) => {
                    return this.getFloorSize().pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.FloorSizeOptionsLoading = false))
                    );
                })
            )
        );
        this.bidTypeOptions$ = concat(
            this.getBidType().pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.bidTypeOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.bidTypeOptionsLoading = true)),
                switchMap((term) => {
                    return this.getBidType().pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.bidTypeOptionsLoading = false))
                    );
                })
            )
        );
        this.customerOptions$ = concat(
            // of([]),
            this.getCustomerOptions().pipe(
                map((res) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.customerOptionsInput$.pipe(
                // filter((res) => {
                //     return res !== null && res.length >= this.minLengthTerm;
                // }),
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.customerOptionsLoading = true)),
                switchMap((term) => {
                    return this.getCustomerOptions(term).pipe(
                        map((res) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.customerOptionsLoading = false))
                    );
                })
            )
        );

        this.stateOptions$ = concat(
            this.getAllStates().pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.stateOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.stateOptionsLoading = true)),
                switchMap((term) => {
                    return this.getAllStates().pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.stateOptionsLoading = false))
                    );
                })
            )
        );

        this.salesRepOptions$ = concat(
            this.getSalesRep().pipe(
                map((res) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.salesRepOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.salesRepOptionsLoading = true)),
                switchMap((term) => {
                    return this.getSalesRep().pipe(
                        map((res) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.salesRepOptionsLoading = false))
                    );
                })
            )
        );
        this.defaultContactOptions$ = concat(
            this.getDefaultContacts().pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.defaultContactOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.defaultContactOptionsLoading = true)),
                switchMap((term) => {
                    return this.getDefaultContacts().pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.defaultContactOptionsLoading = false))
                    );
                })
            )
        );
        this.termsOptions$ = concat(
            this.getTerms().pipe(
                map((res) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.termsOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.termsOptionsLoading = true)),
                switchMap((term) => {
                    return this.getTerms().pipe(
                        map((res) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.termsOptionsLoading = false))
                    );
                })
            )
        );
        this.plantLocationOptions$ = concat(
            this.getPlantLocations().pipe(
                map((res) => {
                    if (
                        this.sharedService.selectedPlantLocationValue?.workType ==
                        LocationType.EngineeringOffice
                    ) {
                        this.selectedPlantLocation =
                            res.data && res.data?.length > 0
                                ? res.data?.sort((a, b) => b.sort - a.sort)[0]
                                : null;
                    } else {
                        this.selectedPlantLocation =
                            this.sharedService.selectedPlantLocationValue;
                    }
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.plantLocationOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.plantLocationOptionsLoading = true)),
                switchMap((term) => {
                    return this.getPlantLocations(term).pipe(
                        map((res) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.plantLocationOptionsLoading = false))
                    );
                })
            )
        );
        this.statusOptions$ = concat(
            this.getCustomerActiveStatus().pipe(
                map((res: any) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.statusOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.statusOptionsLoading = true)),
                switchMap((term) => {
                    return this.getCustomerActiveStatus().pipe(
                        map((res: any) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.statusOptionsLoading = false))
                    );
                })
            )
        );
    }

    loadProjectOptions() {
        this.projectOptions$ = concat(
            this.getProjects().pipe(
                map((res) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.projectOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.projectOptionsLoading = true)),
                switchMap((term) => {
                    return this.getProjects(term).pipe(
                        map((res) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.projectOptionsLoading = false))
                    );
                })
            )
        );
    }
    getProjects(searchTerm?: string) {
        const query: GetProjectsRequest = {
            limit: 100
        };
        if (searchTerm) {
            query.subdivision = searchTerm;
        }
        if (this.selectedCustomer) {
            query.customerKey = this.selectedCustomer.customerKey;
        }
        return this.forecastingService.getProjects(query);
    }

    loadCustomerProjectOptions() {
        this.customerproject = true;
        this.customerProjectOptions$ = concat(
            this.getCustomerInfo(this.selectedCustomer.customerKey).pipe(
                map((res) => {
                    return res.data || [];
                }),
                catchError(() => of([]))
            ),
            this.customerProjectOptionsInput$.pipe(
                distinctUntilChanged(),
                debounceTime(800),
                tap(() => (this.customerProjectOptionsLoading = true)),
                switchMap((term) => {
                    return this.getCustomerInfo(this.selectedCustomer.customerKey).pipe(
                        map((res) => {
                            return res.data || [];
                        }),
                        catchError(() => of([])),
                        tap(() => (this.customerProjectOptionsLoading = false))
                    );
                })
            )
        );
    }
    getJobTypes(searchTerm?: string) {
        const query: GetJobTypesRequest = {
            limit: 100
        };
        if (searchTerm) {
            query.jobType = searchTerm;
        }
        return this.bidService.getJobTypes(query);
    }
    getPlantLocations(searchTerm?: string) {
        const query: GetLocationsRequest = {
            limit: 100
        };
        if (searchTerm) {
            query.locationName = searchTerm;
        }
        if (this.sharedService.isSuperAdminLoggedIn) {
            return this.locationService.getTenantLocations(query);
        } else return this.locationService.getEngOfficeLocationsByUserId(query);
    }
    getCustomerActiveStatus() {
        return this.customerService.getCustomerActiveStatus();
    }
    getTerms() {
        return this.customerService.getTerms();
    }
    getCustomerInfo(customer: any) {
        return this.bidService.getCustomerInfo(customer);
    }
    onFileChanged(event: any) {
        this.folder = event.target.files[0];
        this.filename = this.folder.webkitRelativePath.substring(0, 64);
    }

    onSelectplantlocation(e: any) {
        document.documentElement.style.overflow = 'hidden';
        confirm('Are you sure you want to change the plant location  ?', 'Warning').then(
            (res: boolean) => {
                if (res == true) {
                    this.previousSelectedPlantLocation = this.selectedPlantLocation;
                    document.documentElement.style.overflow = 'auto';
                } else {
                    this.selectedPlantLocation = this.previousSelectedPlantLocation;
                    document.documentElement.style.overflow = 'auto';
                }
            }
        );
    }

    // file upload
    openFile() {
        const files = {} as any;
        this.openFileManager(files);
    }

    openFileManager(files: any) {
        const { jobDir } = this.createBidForm.getRawValue();
        const currentJobDir = { path: jobDir };
        const dialogRef = this.dialog.open(FileManagerDialogComponent, {
            width: '1200px',
            disableClose: true,
            panelClass: ['update-work-order-dialog', 'mat-dialog-actions-exists'],
            data: { files: files, jobDir: currentJobDir, select: true }
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result && result.success) {
                this.createBidForm.patchValue({
                    jobDir: result.jobDir.path
                });
            }
        });
    }
    OnCancelBid() {
        if (this.newProjectAdded == true) {
            const proj_id = this.newProjectID;
            const projectName = this.newProjectName;
            document.documentElement.style.overflow = 'hidden';
            confirm(
                'We are cancelling the Bid. Do you want to delete the project' +
                    projectName +
                    '  in the system?',
                'Warning'
            ).then((res: boolean) => {
                if (res == true) {
                    this.bidService.deleteProjectBid(proj_id).subscribe((res) => {
                        if (res && res.success) {
                            this.successmsg('Project is deleted');
                            this.router.navigate(['/bid/list-bids']);
                        }
                    });
                } else {
                    document.documentElement.style.overflow = 'auto';
                }
            });
        } else {
            this.router.navigate(['/bid/list-bids']);
        }
    }

    public lookupValueChanged = (event: any = []) => {
        const validate = this.customers.find((c) => c.AddCustomerName == event.value);
        if (validate && validate.AddCustomerName) {
            this.toastr.error('selected customer exists');
        } else {
            this.bidService.getCustomerByCustomerName(event.value).subscribe((res) => {
                if (res && res.success && res.data) {
                    this.SelectedAdditionalCustomer = res.data;
                    this.AddCustData = this.SelectedAdditionalCustomer.find(
                        (i: any) => i.cusT_NAME == event.value
                    );
                    this.biddingCustomerKey = this.AddCustData.cusT_KEY;
                    this.addedCustomer = {
                        AddCustomerName: this.AddCustData.cusT_NAME,
                        SalesRepresentative: this.AddCustData.salesRepresentative,
                        Email: this.AddCustData.email,
                        MobileNumber: this.AddCustData.phone,
                        customerKey: this.biddingCustomerKey
                    };
                    this.customers.push(this.addedCustomer);
                    this.additionalCustomer.push(this.biddingCustomerKey);
                }
            });
        }
    };
    onClickDeleteAddCustomer(e: any) {
        document.documentElement.style.overflow = 'hidden';
        confirm(
            'Are you sure you want to delete the Additional Customer ' +
                e.row.data.AddCustomerName +
                '?',
            ''
        ).then((res: boolean) => {
            if (res == true) {
                document.documentElement.style.overflow = 'auto';
                if (e.row.cells[0].displayValue != undefined) {
                    this.customers.splice(
                        this.customers.findIndex(
                            (x) => x.AddCustomerName == e.row.data.AddCustomerName
                        ),
                        1
                    );
                    const selectedCustomerKey = e.row.data.customerKey;
                    this.additionalCustomer = this.additionalCustomer.filter(
                        (customerKey: string) => customerKey !== e.row.data.customerKey
                    );
                }
            } else {
                document.documentElement.style.overflow = 'auto';
                this.router.navigate(['/bid/create-bid']);
            }
        });
    }
    onExporting(e: any) {
        const name = 'Customers';
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(name);
        exportDataGrid({
            component: e.component,
            worksheet: worksheet
        }).then(() => saveExcelFileToLocal(workbook, name));
        e.cancel = true;
    }
    getCustomerStatus(rowData: GetCustomer) {
        return !isNullOrUndefined(rowData.cust_status)
            ? rowData.cust_status
            : 'Not Specified';
    }
    onClickAddCustomers() {
        this.customerPopupVisible = true;
        this.dataSource = new CustomStore({
            key: 'reC_ID',
            load: async (loadOptions: any) => {
                const query: Record<string, string> = {};
                [
                    'filter',
                    'requireTotalCount',
                    'searchExpr',
                    'searchOperation',
                    'searchValue',
                    'sort',
                    'skip',
                    'take'
                ].forEach(function (i) {
                    if (
                        i in loadOptions &&
                        !isNullOrUndefinedOrEmpty<any>(loadOptions[i])
                    ) {
                        query[i] = JSON.stringify(loadOptions[i]);
                    }
                });
                return await firstValueFrom(this.customerService.getCustomers(query))
                    .then((res) => {
                        if (res && res.success) {
                            this.gridCount = res.data?.data.length || 0;
                            return {
                                data: res.data?.data || [],
                                totalCount: res.data?.totalCount
                            };
                        }
                        this.gridCount = 0;
                        return {
                            data: [],
                            totalCount: 0
                        };
                    })
                    .catch((err) => {
                        console.error(err);
                        this.gridCount = 0;
                        return {
                            data: [],
                            totalCount: 0
                        };
                    })
                    .finally(() => {
                        this.storeData();
                    });
            }
        });
    }
    onClickSelect() {
        // this.AddCustData = this.SelectedAdditionalCustomer.find(
        //     (i: any) => i.cusT_NAME == event.value
        // );
        this.customerGrid.instance.hideColumnChooser();
        this.customerService.getCustomerById(this.selectedCustomerBidder).subscribe({
            next: (res) => {
                if (res && res.success && res.data) {
                    this.biddingCustomerKey = res.data.cusT_KEY;
                    this.statusResult = res.data.cust_status;
                    this.customerService.getSalesman(res.data.cusT_SMAN_KEY).subscribe({
                        next: (res) => {
                            if (res && res.success && res.data) {
                                this.AddCustData = res.data;
                            }
                            this.bidService
                                .getProjectBySubdivision(this.selectedProject.subdivision)
                                .subscribe({
                                    next: (res) => {
                                        if (res && res.success && res.data) {
                                            this.customerService
                                                .getSalesman(res.data.salesRep)
                                                .subscribe({
                                                    next: (res) => {
                                                        if (res && res.success) {
                                                            this.bidSalesRep =
                                                                res.data?.smaN_NAME;
                                                            this.projectSalesRep =
                                                                res.data?.smaN_NAME;
                                                            this.addedCustomer = {
                                                                AddCustomerName:
                                                                    this
                                                                        .biddingCustomerKey,
                                                                Status: this.statusResult,
                                                                SalesRepresentative:
                                                                    this.AddCustData
                                                                        .smaN_NAME,
                                                                Email: this.AddCustData
                                                                    .eMail,
                                                                MobileNumber:
                                                                    this.AddCustData
                                                                        .phone,
                                                                customerKey:
                                                                    this
                                                                        .biddingCustomerKey,
                                                                BidSalesRepresentative:
                                                                    this.bidSalesRep,
                                                                ProjectSalesRepresentative:
                                                                    this.projectSalesRep
                                                            };
                                                            this.customers.push(
                                                                this.addedCustomer
                                                            );
                                                            this.additionalCustomer.push(
                                                                this.biddingCustomerKey
                                                            );
                                                        }
                                                    },
                                                    error: (err) => {
                                                        console.error(err);
                                                    }
                                                });
                                        }
                                    },
                                    error: (err) => {
                                        console.error(err);
                                    }
                                });
                        },
                        error: (err) => {
                            console.error(err);
                        }
                    });
                }
            },
            error: (err) => {
                console.error(err);
            }
        });
        this.customerPopupVisible = false;
        this.selectedCustomerBidder = [];
    }
    onClickResetCancel() {
        this.customerGrid.instance.getScrollable().scrollTo(0);
        this.customerGrid.instance.state(null);
    }
    onSelectStatus(e: any) {
        if (e.activestatus == 'Active') {
            this.createprojectForm.patchValue({
                active: true
            });
        }
    }
    handleCloseButtonClick() {
        this.customerGrid.instance.hideColumnChooser();
    }
}
