import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { BehaviorSubject } from 'rxjs';
import { merchant } from './merchant-control';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent extends Base implements OnInit, OnDestroy{
  public id = undefined;
  public isUpdate = false;
  merchantFormGroup: FormGroup;
  merchantFormSubmitted = false;
  sendingState$ = new BehaviorSubject<boolean>(false);
  sending = false;
  groupList: any;

  public fields: any = { value: 'value', text: 'value' };
  public group_fields: any = { value: 'value', text: 'text' };

  constructor(
   public httpCancelService: HttpCancelService,
   private merchantFormBuilder: FormBuilder,
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
    let payload = {for:'system',project_type:'delivery'}
    this.id = this.actRoute.snapshot.params.id;
    this.load_group(payload);
    this.load_team();


    if (this.id !== undefined) {
      this.isUpdate = true;

      this.crudService.detail(this.id, 'user/merchant/detail').subscribe((res: any) => {
        this.merchantFormGroup.patchValue(res.data);
        this.load_team(res.data.delivery_team);
        this.load_city(res.data.address.region_id, res.data.address.city,this.merchantFormGroup,'address.city');
        this.load_sub_city(res.data.address.city_id, res.data.address.sub_city,this.merchantFormGroup,'address.sub_city');



      });
    }

    this.sendingState$.subscribe(status => {
      this.sending = status;
      this.cdRef.detectChanges();
    });

  }

  createForm(): void {

   this.merchantFormGroup = this.createControls(merchant)
}
  // to accept only number
  numberOnly(event): boolean {
    return this.crudService.convertInputToNumber(event);

  }
  getGroup(){
    this.crudService.list('user/merchant/load_group').subscribe((res: any) => {
      this.groupList = res.data;


  });
}
load_team(actual_value = null){
  const payload = { lookup_type: 'merchant_team' };
  const control: any = this.merchantFormGroup.get('delivery_team');

  this.load_lookup(payload, null, control, actual_value);
}
Submit($evt){
  if (this.merchantFormGroup.valid){
this.merchantFormSubmitted = true;
const payload = this.merchantFormGroup.value;
this.crudService.submit(payload, 'user/merchant', null, $evt, this.merchantFormGroup);
}
else {
  this.merchantFormSubmitted = true;
  return;
  }
}

}
