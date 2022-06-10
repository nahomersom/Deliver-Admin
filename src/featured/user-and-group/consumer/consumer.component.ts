import { T } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { BehaviorSubject } from 'rxjs';
import { consumer } from './consumer-cotrol';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})
export class ConsumerComponent extends Base implements OnInit, OnDestroy {
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
   public httpCancelService: HttpCancelService,
   private userAccountFormBuilder: FormBuilder,
   private userAddressFormBuilder: FormBuilder,
   private cdRef: ChangeDetectorRef,
   public crudService: CrudOperationService,
   private actRoute?: ActivatedRoute,
  ) {
    super(crudService)
    this.createForm();
    this.load_region();
  }

  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }
  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params.id;
    let payload = {for:'customer',project_type:'delivery'}
    this.id = this.actRoute.snapshot.params.id;
    this.load_group(payload);

    if (this.id !== undefined) {
      this.isUpdate = true;

      this.crudService.detail(this.id, 'user/customer/detail').subscribe((res: any) => {
        this.userCredentialsFormGroup.patchValue(res.data);
        this.crudService.getControl(this.userCredentialsFormGroup, 'id').setValue(res.data.account.id);
        this.load_city(res.data.address.region_id, res.data.address.city,this.userCredentialsFormGroup,'address.city');
        this.load_sub_city(res.data.address.city_id, res.data.address.sub_city,this.userCredentialsFormGroup,'address.sub_city')

      });
    }

    this.sendingState$.subscribe(status => {
      this.sending = status;
      this.cdRef.detectChanges();
    });

  }

  createForm(): void {
   this.userCredentialsFormGroup = this.createControls(consumer)
  }

// to accept only number
numberOnly(event){
return this.crudService.convertInputToNumber(event);
}

  getGroup(){
    this.crudService.list('user/customer/load_group').subscribe((res: any) => {
      this.groupList = res.data;

  });
}
// load_region(){
//   const payload = { lookup_type: 'region'};
//   this.load_lookup(payload, 'city');
// }
// load_city(value, actual_value){
//   const payload = { parent_id: value, lookup_type: 'city'};

//   const control: any = this.userCredentialsFormGroup.get('address.city');

//   this.load_lookup(payload, 'sub_city', control, actual_value);
// }
// load_sub_city(value, actual_value){
//   const payload = { parent_id: value, lookup_type: 'sub_city'};
//   const control: any = this.userCredentialsFormGroup.get('address.sub_city');

//   this.load_lookup(payload, null, control, actual_value);
// }

Submit($evt){

  if (this.userCredentialsFormGroup.valid){

this.userCredentialFormSubmitted = true;
const payload = this.userCredentialsFormGroup.value;
this.crudService.submit(payload, 'user/customer', null, $evt, this.userCredentialsFormGroup);
}else {
this.userCredentialFormSubmitted = true;

return;
}
}

  }

