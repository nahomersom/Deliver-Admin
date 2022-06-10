import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AccumulationDataLabelService, AreaSeriesService } from '@syncfusion/ej2-angular-charts';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { page: 'Dashboard', action: 'canView', title: 'Dashboard', breadCrumb: 'Dashboard' },
  }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    DateRangePickerModule,
    RouterModule.forChild(routes)
  ],
  providers: [AreaSeriesService, AccumulationDataLabelService]
})
export class DashboardModule { }
