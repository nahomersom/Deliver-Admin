import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { environment } from '@environments/environment';
import { driver } from 'featured/vehicle-and-driver/driver-form/driver-control';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';


@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css']
})

export class DriverFormComponent extends Base implements OnInit, AfterViewInit, OnDestroy  {
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: any  = [];
  vehicleTypeList: any;
  public fields: any = { text: 'value', value: 'value' };
  public vehicleTypefields: any = {text: 'text', value: 'value'};
  id = undefined;
  public isUpdate = false;
  driverFormGroup: FormGroup;
  driverFormSubmitted = false;
  sendingState$ = new BehaviorSubject<boolean>(false);
  sending = false;
  selected = false;
  imageUrl: any;
  type: string;
  public city = null;
  public image: any = null;
  public imgFrom: any;

  constructor(
    public builder: FormBuilder,
    public location: Location,
    public router: Router,
    public service: CrudOperationService,
    public actRoute: ActivatedRoute,
    public httpCancelService: HttpCancelService,
    public cdRef: ChangeDetectorRef) {
    super(service);
    this.createForm();
    this.load_region();

  }

  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }
  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params.id;

    this.load_driver_type();
    this.load_team();
    this.load_color();


    if (this.id !== undefined) {
      this.isUpdate = true;

      this.service.detail(this.id, 'user/driver/detail').subscribe((res: any) => {

         const parsedTags = JSON.parse(res.data.tags);
         this.load_city(res.data.address.region_id,res.data.address.city,this.driverFormGroup,'address.city');     
         this.load_sub_city(res.data.address.city_id,res.data.address.sub_city,this.driverFormGroup,'address.sub_city');
         this.load_driver_type(res.data.driver_type);
         this.load_team(res.data.team);
         this.load_color(res.data.color);
         parsedTags.forEach((tag: any) => this.tags.push(tag));
         this.driverFormGroup.get('tags').patchValue(parsedTags);
         this.driverFormGroup.patchValue(res.data);
         this.image = `${environment.baseUrl}uploads/user/profile_image/${this.id}?time=${new Date()}`;
         this.imgFrom = `${environment.baseUrl}uploads/user/profile_image/${this.id}?time=${new Date()}`;

         this.getControl(this.driverFormGroup, 'image').setValue(this.image);

      });
    }

  }

  ngAfterViewInit(): void {
    document.getElementById('browse').onclick = (args) => {
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
    };
  }

  // adding tags value
  add(event): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push(value);
      this.driverFormGroup.get('tags').setValue(this.tags);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tags): void {
    const index = this.tags.indexOf(tags);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  createForm(): void {
    this.driverFormGroup = this.createControls(driver);
  }


  load_driver_type(actual_value = null){
    const payload = { lookup_type: 'driver_type'};
    const control: any = this.driverFormGroup.get('driver_type');

    this.load_lookup(payload, null, control, actual_value);
  }
  load_color(actual_value = null){
    const payload = { lookup_type: 'color'};
    const control: any = this.driverFormGroup.get('color');

    this.load_lookup(payload, null, control, actual_value);
  }
  load_team(actual_value = null){
    const payload = { lookup_type: 'driver_team'};
    const control: any = this.driverFormGroup.get('team');

    this.load_lookup(payload, null, control, actual_value);
  }
  onTrash(){
    this.selected = false;
    this.id !== undefined ? this.image = this.imgFrom : this.image = null;;
  }

  Submit($evt){
  const payload = this.driverFormGroup.value;

  payload.tags = JSON.stringify(this.tags);
  payload.image = this.imageUrl ?? this.image;

  if (this.driverFormGroup.valid && payload.image){
     this.driverFormSubmitted = true;
     this.service.submit(payload, 'user/driver', null, $evt, this.driverFormGroup);

    } else {
      this.driverFormSubmitted = true;
    }

  }




}
