import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverFormComponent } from './driver-form/driver-form.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { AgentComponent } from './assign/agent.component';
import { AuthGuard } from '@core/security/auth-guard.service';

const routes: Routes = [
  {
    path: 'vehicle/create',
    component: VehicleFormComponent,
    data: { page: 'Item', action: 'canAdd', title: 'Vehicles', breadCrumb: 'Create' , formTitle: 'Create New Vehicle'},
    canActivate: [AuthGuard]
  },
  {
    path: 'vehicle/:id/update',
    component: VehicleFormComponent,
    data: { page: 'Item', action: 'canUpdate', title: 'Vehicles', breadCrumb: 'Update', formTitle: 'Update Existing Vehicle' },
    canActivate: [AuthGuard]
  },
  {
    path: 'vehicle-type/create',
    component: VehicleTypeComponent,
    data: { page: 'Type', action: 'canAdd', title: 'Vehicles Type', breadCrumb: 'Create', formTitle: 'Create New Vehicle Type' },
    canActivate: [AuthGuard]
  },
  {
    path: 'vehicle-type/:id/update',
    component: VehicleTypeComponent,
    data: { page: 'Type', action: 'canUpdate', title: 'Vehicles Type', breadCrumb: 'Update', formTitle: 'Update Existing Vehicle Type' },
    canActivate: [AuthGuard]
  },
  {
    path: 'driver/create',
    component: DriverFormComponent,
    data: { page: 'Driver', action: 'canAdd', title: 'Driver', breadCrumb: 'Create', formTitle: 'Create New Driver'  },
    canActivate: [AuthGuard]
  },
  {
    path: 'driver/:id/update',
    component: DriverFormComponent,
    data: { page: 'Driver', action: 'canUpdate', title: 'Driver', breadCrumb: 'Update', formTitle: 'Update Existing Driver'  },
    canActivate: [AuthGuard]
  },
  {
    path: 'assign/create',
    component: AgentComponent,
    data: { page: 'Assign', action: 'canAdd', title: 'Assign Driver & Vehicle', breadCrumb: 'Create', formTitle: 'Assign Vehicle for Driver'  },
    canActivate: [AuthGuard]
  },
  {
    path: 'assign/:id/update',
    component: AgentComponent,
    data: { page: 'Assign', action: 'canUpdate', title: 'Assign Driver & Vehicle', breadCrumb: 'Update', formTitle: 'Update Assigning'  },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    DriverFormComponent,
    VehicleFormComponent,
    VehicleTypeComponent,
    AgentComponent,
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule
  ]
})
export class VehicleAndDriverModule { }
