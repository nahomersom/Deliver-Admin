import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SecurityService } from '@core/security/security.service';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'find',
    component: ForgotPasswordComponent,
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,

  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule
  ],

})
export class AuthenticationModule { }
