import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupComponent } from './lookup/lookup.component';
import { EmailSettingComponent } from './email-setting/email-setting.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { LanguageComponent } from './language/language.component';
const routes: Routes = [
  {
    path: 'lookup/create',
    component: LookupComponent,
    data: { page: 'Lookup', action: 'canAdd', title: 'Lookup', breadCrumb: 'Create', formTitle: 'Create New Lookup' },
  },
  {
    path: 'lookup/:id/update',
    component: LookupComponent,
    data: { page: 'Lookup', action: 'canUpdate', title: 'Lookup', breadCrumb: 'Update', formTitle: 'Update Existing Lookup' },
  },
  {
    path: 'language/create',
    component: LanguageComponent,
    data: { page: 'Language', action: 'canAdd', title: 'Language', breadCrumb: 'Create', formTitle: 'Create New Language' },
  },
  {
    path: 'language/:id/update',
    component: LanguageComponent,
    data: { page: 'Language', action: 'canUpdate', title: 'Language', breadCrumb: 'Update', formTitle: 'Update Existing Language' },
  },
  {
    path: '',
    component: EmailSettingComponent,
    data: { page: 'Setting', action: 'canView', title: 'Setting', breadCrumb: 'Form', formTitle: 'Create & Update System Setting' },
  },
];

@NgModule({
  declarations: [
    LookupComponent,
    EmailSettingComponent,
    LanguageComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SettingsModule { }
