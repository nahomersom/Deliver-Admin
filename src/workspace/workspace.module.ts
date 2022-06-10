import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceComponent } from './workspace/workspace.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SecurityService } from '@core/security/security.service';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    loadChildren: () => import('../featured/featured.module').then((m) => m.FeaturedModule),
    data: { breadCrumb: 'FEATURED' },
  },
];

@NgModule({
  declarations: [WorkspaceComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule, DropDownButtonModule,
    BreadcrumbModule,
    NgbModule
  ],
  exports: [RouterModule],

})
export class WorkspaceModule { }
