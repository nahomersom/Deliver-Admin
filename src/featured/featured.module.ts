import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DynamicListComponent } from './dynamic-list/dynamic-list.component';
import { SharedModule } from '@shared/shared.module';
import { gridData } from '@environments/grid-data';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { AuthGuard } from '@core/security/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


/* The path name in sidebar & json name should be the same */
const data = [
  { formTitle: 'assign driver for vehicle Management' , path: 'assign', page: 'Assign', title: 'Assign Driver & Vehicle' },
  { formTitle: 'drivers Management' , path: 'driver', page: 'Driver', title: 'Driver' },
  { formTitle: 'vehicle Management' , path: 'vehicle', page: 'Item', title: 'Vehicle' },
  { formTitle: 'user Management' , path: 'system', page: 'System', title: 'System User' },
  { formTitle: 'User Group Management' , path: 'group', page: 'Group', title: 'Group' },
  { formTitle: 'lookup Management' , path: 'lookup', page: 'Lookup', title: 'Group' },
  { formTitle: 'merchant Management' , path: 'merchant', page: 'Merchant', title: 'Merchant' },
  { formTitle: 'order Management' , path: 'order', page: 'order', title: 'order' },
  { formTitle: 'vehicle Management' , path: 'vehicle_type', page: 'Type', title: 'Vehicle Type' },
  { formTitle: 'consumer Management' , path: 'consumer', page: 'Customer', title: 'consumer' },
  { formTitle: 'language Management' , path: 'language', page: 'language', title: 'language' },
];
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: { title: 'Dashboard', breadCrumb: 'Dashboard' },
  },
  /* Accessing all grid json from merged gridData file ...
   the type which will be sent from sidebar menu json and the key name in gridData json should be the same
   to get the grid json data */

    ...data.map(ele => ({
    path: ele.path + '/list',
    component: DynamicListComponent,
    data: { 
      formTitle: ele.formTitle  , 
      page: ele.page, 
      action: 'canView', 
      title: ele.title.toUpperCase(), 
      breadCrumb: 'list', 
      gridInfo: gridData[ele.path] 
    },
    canActivate: [AuthGuard]
  
  })),
  {
    path: 'vehicle-and-driver',
    loadChildren: () => import('./vehicle-and-driver/vehicle-and-driver.module').then((m) => m.VehicleAndDriverModule),
    data: { breadCrumb: '' },
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then((m) => m.ChangePasswordModule),
    data: { breadCrumb: 'Change password' },
  },
  {
    path: 'user-and-group',
    loadChildren: () => import('./user-and-group/user-and-group.module').then((m) => m.UserAndGroupModule),
    data: { breadCrumb: 'User and Group' },
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
    data: { breadCrumb: 'Settings' },
  },
  {
    path:'**',
    component:PageNotFoundComponent,
    pathMatch:'full',
  }


];

@NgModule({
  declarations: [
    DynamicListComponent
  ],
  imports: [
    SharedModule,
    DialogModule,
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class FeaturedModule { }
