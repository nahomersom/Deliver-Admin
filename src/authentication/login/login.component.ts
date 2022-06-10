import { C } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from '@core/security/security.service';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { BehaviorSubject, throwError } from 'rxjs';
import { LoginData } from '../auth-model';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { CookieEncryptionService } from '@core/security/cookie-encryption.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  formSubmitted = false;
  requestSend = false;
  sendingState$ = new BehaviorSubject<boolean>(false);
  sending = false;
  disabled: boolean = false;
  constructor(
   private loginFormBuilder: FormBuilder,
   private cdRef: ChangeDetectorRef,
   private crudService: CrudOperationService,
   private router: Router,
   public security: SecurityService,
   private toastr: ToastrService,
   private encryptDecryptCookie:CookieEncryptionService

  ) {
    this.createForm();
    this.toastr.toastrConfig.enableHtml = true;

  }

  ngOnInit(): void {
    this.sendingState$.subscribe(status => {
      this.sending = status;
      this.cdRef.detectChanges();

    });
  }

  createForm(): void {
   this.loginFormGroup = this.loginFormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    remember: [false],
    password: ['', [Validators.required, Validators.minLength(5)]],
   });

  }

  prepareData(): LoginData {
    const data = new LoginData();
    if (this.loginFormGroup.valid) {
      data.email = this.crudService.getControl(this.loginFormGroup, 'email').value;
      data.password = this.crudService.getControl(this.loginFormGroup, 'password').value;
      data.remember = this.crudService.getControl(this.loginFormGroup, 'remember').value;
    }
    return data;
  }
  navigate(){
    this.router.navigateByUrl('authentication/find');
  }
Submit(){
  this.disabled = true;
  const payload = this.prepareData();
  if (this.loginFormGroup.valid){
    this.formSubmitted = true;
    this.requestSend = true;

    this.crudService.post(payload, 'Account/Authentication/Login',true)
    .pipe(
     
      catchError((e: any) =>{
 
    this.requestSend = false;
    this.disabled = false;
    this.toastr.error('you\'re not connected to the network' );
        return throwError(e);
      }),
  )
    
    .subscribe( (res: any) => {
        if (res.status){
          res.message.role = JSON.parse(res.message.role);
          this.security.securityObject = res.message;
          if(payload.remember){
            this.crudService.setCookie(this.encryptDecryptCookie.encrypt(JSON.stringify(res.message)));
          }
     
          this.router.navigateByUrl('/ws');

        } else {
          this.disabled = false;
          this.toastr.error(res.message, 'Error');
        }

        this.requestSend = false;
    });

} else {
this.formSubmitted = true;
return;
}
  }

}

