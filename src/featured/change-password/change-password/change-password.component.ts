import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordData } from './change-password.model';
import { BehaviorSubject } from 'rxjs';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { SecurityService } from '@core/security/security.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordGroup: FormGroup;
  formSubmitted = false;
  sendingState$ = new BehaviorSubject<boolean>(false);
  sending = false;
  constructor(
   private changePasswordFormBuilder: FormBuilder,
   private cdRef: ChangeDetectorRef,
   public crudService: CrudOperationService,
   public security: SecurityService,
   private toastr: ToastrService,
   private router: Router
  ) {
    this.createForm();
  }


  ngOnInit(): void {
    this.sendingState$.subscribe(status => {
      this.sending = status;
      this.cdRef.detectChanges();

    });
  }
    // validating the form
  createForm(): void {
   this.changePasswordGroup = this.changePasswordFormBuilder.group({

    old_password: [null, [Validators.required, Validators.minLength(5)]],
    new_password: [null, [Validators.required, Validators.minLength(5)]],
   });

  }

    // assigning form control control value to the model
  prepareData(): ChangePasswordData {
    const data = new ChangePasswordData();
    if (this.changePasswordGroup.valid) {
      data.id = this.security.securityObject.id;
      data.old_password = this.crudService.getControl(this.changePasswordGroup, 'old_password').value;
      data.new_password =  this.crudService.getControl(this.changePasswordGroup, 'new_password').value;
    }
    return data;
  }

Submit(){
  const payload = this.prepareData();

  if (this.changePasswordGroup.valid){
this.formSubmitted = true;
this.crudService.post(payload, 'Account/Authentication/change_password',true).subscribe( (res: any) => {
  if (res.status){
    this.toastr.success(res.message, 'Success');
    this.security.logout();
    this.security.securityObject = res.message;
    
     
  } else {
   
    this.toastr.error(res.message, 'Error');
  }

 });

} else {
this.formSubmitted = true;
return;
}
}

}
