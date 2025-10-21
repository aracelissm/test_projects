import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { MainComponent } from './layouts/main/main.component';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { PendingChangesGuard } from './guards/pending-changes-guard.service';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HttpErrorInterceptor } from './interceptors/error.interceptors';
import { AuthService } from './services/auth.service';
import { WindowsServiceLogService } from './services/windows-service-log.service';
import { PlatePickingStationModule } from './modules/plate-picking-station/plate-picking-station.module';
import { WebcamModule } from 'ngx-webcam';
import { ExcelViewer } from './modules/shared/components/dialogs/excel-viewer/excel-viewer.component';
import { AppPipesModule } from './modules/shared/modules/app-pipes.module';
import { CommonModule } from '@angular/common';
import { TopNavigationmenuComponent } from './modules/shared/components/top-navigationmenu/top-navigationmenu.component';
import { SideNavigationComponent } from './modules/shared/components/side-navigation/side-navigation.component';
import { FooterComponent } from './modules/shared/components/footer/footer.component';

export let AppInjector: Injector;

@NgModule({
    
declarations: [
        
  ],

    imports: [        
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        SharedModule,
        CommonModule,
        AppPipesModule,
        ToastrModule.forRoot(),
        PlatePickingStationModule,
        WebcamModule,
        AppComponent,
        AuthComponent,
        MainComponent,
        ExcelViewer,
        TopNavigationmenuComponent,
        SideNavigationComponent,
        FooterComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true,
            deps: [ToastrService, AuthService, WindowsServiceLogService]
        },
        PendingChangesGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private injector: Injector) {
        AppInjector = this.injector;
    }
}
