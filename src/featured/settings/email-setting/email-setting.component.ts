import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { BehaviorSubject } from 'rxjs';
import { email } from './email-control';
import { EmailSettingData } from './email-setting.model';

@Component({
  selector: 'app-email-setting',
  templateUrl: './email-setting.component.html',
  styleUrls: ['./email-setting.component.css']
})
export class EmailSettingComponent extends Base implements OnInit , OnDestroy{
  EmailSettingGroup: FormGroup;
  formSubmitted = false;
  sendingState$ = new BehaviorSubject<boolean>(false);
  sending = false;
  isEdit = false;
  index: any;
  deletedKeys: any[] = [];
  newKeys: any[] = [];
  existingKeys: any[] = [];

  constructor(
   public httpCancelService: HttpCancelService,
   public crudService: CrudOperationService,
  ) {
    super(crudService)
    this.createForm();
  }

  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }
  ngOnInit(): void {
    this.crudService.list('util/setting').subscribe((res: any) => {
      res.data.email = JSON.parse(res.data.email)
      res.data.other = JSON.parse(res.data.other)

      this.EmailSettingGroup.patchValue(res.data);
      // this.EmailSettingGroup.get('id').setValue(res.data.id);

      res.data.keys.forEach(ele => {
        this.add(ele);
      });

    });
  }

  createForm(): void {
   this.EmailSettingGroup = this.createControls(email)
  }

  // prepareData(): EmailSettingData {
  //   const data = new EmailSettingData();


  //   if (this.EmailSettingGroup.valid) {
  //     data.id = this.crudService.getControl(this.EmailSettingGroup, 'id').value;
  //     data.email.protocol = this.crudService.getControl(this.EmailSettingGroup, 'email.protocol').value;
  //     data.email.host = this.crudService.getControl(this.EmailSettingGroup, 'email.host').value;
  //     data.email.port = this.crudService.getControl(this.EmailSettingGroup, 'email.port').value;
  //     data.email.email = this.crudService.getControl(this.EmailSettingGroup, 'email.email').value;
  //     data.email.password = this.crudService.getControl(this.EmailSettingGroup, 'email.password').value;
  //     data.other.minimum_km = this.crudService.getControl(this.EmailSettingGroup, 'other.minimum_km').value;

  //     data.keys.new = this.newKeys;
  //     data.keys.existing = this.existingKeys;
  //     data.keys.deleted = this.deletedKeys;

  //   }

  //   return data;

  // }

  public GA(): FormArray {
    return this.EmailSettingGroup.get('keys') as FormArray;
  }

  public GG(index): FormGroup {
    return this.GA().controls[index] as FormGroup;
  }

  public add(data){
    this.GA().push(
      new FormGroup({
        id: new FormControl(data.id),
        key: new FormControl(data.key, Validators.required),
      })
    );
  }

  onKeyEnter($event){
    if ($event.key === 'Enter' && this.EmailSettingGroup.get('key').valid){
      if (this.isEdit){
        this.update(this.EmailSettingGroup.get('key').value);

      } else {
        this.add({ id: null, key: this.EmailSettingGroup.get('key').value });
        this.EmailSettingGroup.get('key').reset();
      }

    }

  }

  public edit(index){
    this.isEdit = true;
    this.index = index;
    this.EmailSettingGroup.get('key').setValue(this.GG(index).get('key').value);
  }

  public update(value){
    this.isEdit = false;
    this.GG(this.index).get('key').setValue(value);
    this.EmailSettingGroup.get('key').reset();
  }

  public remove(index, id){
    if (confirm('are you sure want to remove this ?')) {
      this.deletedKeys.push(id);
      this.GA().removeAt(index);
    }
  }


  Submit($evt){

    this.GA().value.forEach((ele) => {
      ele.id === null ? this.newKeys.push(ele) : this.existingKeys.push(ele);
    });
    const payload = this.EmailSettingGroup.value;
    let keys = { new: this.newKeys, existing: this.existingKeys, deleted:this.deletedKeys };
    payload.keys = keys;
    delete payload.key;
    if (this.EmailSettingGroup.valid){
      this.formSubmitted = true;
      this.crudService.submit(payload, 'util/setting');

    } else {
      this.formSubmitted = true;
      return;
    }

  }
 


}
