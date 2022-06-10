import { T } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Component, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SecurityService } from '@core/security/security.service';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends Base  implements OnInit {

  public id = undefined;
        userCredentialsFormGroup: FormGroup;
        userCredentialFormSubmitted = false;
        public isUpdate = false;
        sendingState$ = new BehaviorSubject<boolean>(false);
        sending = false;
        groupList: any;

        public fields: any = { value: 'value', text: 'value' };
        public group_fields: any = { value: 'value', text: 'text' };
        constructor(

         private userAccountFormBuilder: FormBuilder,
         private userAddressFormBuilder: FormBuilder,
         private cdRef: ChangeDetectorRef,
         public crudService: CrudOperationService,
         private actRoute?: ActivatedRoute,
         private  securityService?: SecurityService,
        ) {
          super(crudService)
          this.createForm();

        }


        ngOnInit(): void {

          this.id = this.securityService.securityObject.id;
          this.load_region();
          this.getGroup();

          if (this.id !== undefined) {
              this.isUpdate = true;
              this.crudService.detail(this.id, 'user/system/detail',true).subscribe((res: any) => {
                res.data.status = res.data.status === '1' ? true : false;
             
                this.load_city(res.data.address.region_id, res.data.address.city,this.userCredentialsFormGroup,'address.city');
                this.load_sub_city(res.data.address.city_id, res.data.address.sub_city,this.userCredentialsFormGroup,'address.city');
                this.userCredentialsFormGroup.patchValue(res.data);

              });
            }

          this.sendingState$.subscribe(status => {
              this.sending = status;
              this.cdRef.detectChanges();
            });
    }

        createForm(): void {

         this.userCredentialsFormGroup = this.userAccountFormBuilder.group({
          id: [null],
          account: this.userAccountFormBuilder.group({
          id: [null],
          full_name: [null, [Validators.required]],
          phone_number: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
          email: [null, [Validators.required, Validators.email]],

          type: ['sys'],
        }),
          address: this.userAddressFormBuilder.group({
            id: [null],
            region: [null, [Validators.required]],
            city: [null, [Validators.required]],
            sub_city: [null, [Validators.required]],
            wereda: [null, [Validators.required]],
                 })

         });

        }

  // to accept only number
  numberOnly(event){
    return this.crudService.convertInputToNumber(event);
  }

        getGroup(){
          this.crudService.list('user/system/load_group').subscribe((res: any) => {
            this.groupList = res.data;
        });
      }

   Submit(){

  if (this.userCredentialsFormGroup.valid){

      this.userCredentialFormSubmitted = true;
      const payload = this.userCredentialsFormGroup.value;

     this.crudService.submit(payload, 'user/system');
    
   }else {
    this.userCredentialFormSubmitted = true;

    return;
    }
      }
 


        }

