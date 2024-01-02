import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { HeroAreaComponent } from './components/hero-area/hero-area.component';
import { ListingsTableComponent } from './components/listings-table/listings-table.component';
import { BadgeComponent } from './components/shared/badge/badge.component';
import { TypographyComponent } from './components/shared/typography/typography.component';
import { DatetimeComponent } from './components/shared/datetime/datetime.component';
import { UserprofileComponent } from './components/shared/userprofile/userprofile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';

import { DateTimeRangePipe } from './pipes/date-time-range.pipe';
import { FsmButtonComponent } from './components/shared/fsm-button/fsm-button.component';
import { FcmPaginator } from './utils/FcmPagintor';
import { FilterComponent } from './components/shared/filter/filter.component';
import { CustomizeComponent } from './components/shared/customize/customize.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeroAreaComponent,
    JobsComponent,
    ListingsTableComponent,
    BadgeComponent,
    TypographyComponent,
    DatetimeComponent,
    UserprofileComponent,
    DateTimeRangePipe,
    DashboardComponent,
    SettingsComponent,
    FsmButtonComponent,
    FilterComponent,
    CustomizeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
  ],
  providers: [DateTimeRangePipe,  { provide: MatPaginatorIntl, useClass: FcmPaginator }],
  bootstrap: [AppComponent]
})
export class AppModule { };
