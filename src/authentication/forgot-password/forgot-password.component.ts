
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { T } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordGroup: FormGroup;
  formSubmitted :boolean = false;
  sendingState$ = new BehaviorSubject<boolean>(false);
  sending :boolean = false;
  disabled : boolean = false;
  requestSend:boolean = false;
  constructor(
    private forgetPasswordFormBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private crudService: CrudOperationService,
    public location: Location,
    private toastr: ToastrService,
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
    this.forgotPasswordGroup = this.forgetPasswordFormBuilder.group({
     email: ['', [Validators.required, Validators.email]],
    });

   }
   get email(): FormControl {
    return this.forgotPasswordGroup.get('email') as FormControl;
  }


Submit(){

  const payload = {email: this.email.value};
  if (this.forgotPasswordGroup.valid){
    this.disabled = true;
    this.requestSend = true;

    this.formSubmitted = true;
    this.crudService.post(payload,'Account/Authentication/find',true).subscribe((res) => {
     this.disabled = false;
     this.requestSend = false;
     if (res.status ){
   this.confirmation(res);
   this.toastr.success(res.message, 'Success')
  }
 else{
  this.toastr.error(res.message, 'Error');
 }

});
}
else {
 this.formSubmitted = true;
 return;
}
  }


confirmation(response){
 const payload = response.data;
 const confirmation = window.confirm('this account registered with ' + response.data.full_name + ' would you like to send an Email with default password ?');
 if (confirmation == true){
     return  this.crudService.submit(payload, 'user/account/send_password', 'authentication/login');
     }
 else{
       return;
     }
  }
Cancel(){
    this.location.back();
  }
}
