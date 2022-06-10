import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MerchantComponent } from './merchant/merchant.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'user/create',
    component: UserComponent,
    data: { page: 'System', action: 'canAdd', title: 'User', breadCrumb: 'Create', formTitle: 'Create New User' },
  },
  {
    path: 'user/:id/update',
    component: UserComponent,
    data: { page: 'System', action: 'canUpdate', title: 'User', breadCrumb: 'Update', formTitle: 'Update Existing User' },
  },
  {
    path: 'user/profile',
    component: UserProfileComponent,
    data: { title: 'User Profile', breadCrumb: 'Profile', formTitle: 'User Profile' },
  },
  {
    path: 'group/create',
    component: GroupComponent,
    data: { page: 'Group', action: 'canAdd', title: 'Group', breadCrumb: 'Create', formTitle: 'Create New Group' },
  },
  {
    path: 'group/:id/update',
    component: GroupComponent,
    data: { page: 'Group', action: 'canUpdate', title: 'Group', breadCrumb: 'Update', formTitle: 'Update Existing Group' },
  },
  {
    path: 'merchant/create',
    component: MerchantComponent,
    data: { page: 'Merchant', action: 'canAdd', title: 'Merchant', breadCrumb: 'Create', formTitle: 'Create New Merchant' },
  },
  {
    path: 'merchant/:id/update',
    component: MerchantComponent,
    data: { page: 'Merchant', action: 'canUpdate', title: 'Merchant', breadCrumb: 'Update', formTitle: 'Update Existing Merchant' },
  },
  {
    path: 'customer/create',
    component: ConsumerComponent,
    data: { page: 'Customer', action: 'canAdd', title: 'customer', breadCrumb: 'Create', formTitle: 'Create New Customer' },
  },
  {
    path: 'customer/:id/update',
    component: ConsumerComponent,
    data: { page: 'Customer', action: 'canUpdate', title: 'customer', breadCrumb: 'Update', formTitle: 'Update Existing Customer'},
  }
];



@NgModule({
  declarations: [

    UserComponent,
    GroupComponent,
    MerchantComponent,
    ConsumerComponent,
    GroupComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule
  ]
})
export class UserAndGroupModule { }
