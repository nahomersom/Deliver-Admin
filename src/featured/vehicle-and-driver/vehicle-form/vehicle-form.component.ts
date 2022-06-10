import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '@environments/environment';
import { BehaviorSubject } from 'rxjs';
import { vehicle } from 'featured/vehicle-and-driver/vehicle-form/vehicle-control';
import { Base } from '@core/utils/base';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { Location } from '@angular/common';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent extends Base implements OnInit , OnDestroy {

  formGroup: FormGroup;
  vehicleFormSubmitted = false;
  sendingState$ = new BehaviorSubject<boolean>(false);
  sending = false;
  ownerPhoto: any;
  owner_attachmentUrl: any;
  owner_attachment: any;
  type: string;
  error = false;
  region: any;
  city: any;
  sub_city: any;
  vehicle_imageUrl: any = null;
  owner_imageUrl: any;
  owner_image: any;
  vehicle_image: any;
  public imgFromOwner: any = null;
  public imgFromVehicle: any = null;
  public autoUpload = false;
  selected = false;
  id = undefined;
  public isUpdate = false;
  public vehicle_types: any[] = [];
  public fields: any = { text: 'value', value: 'value' };
  public vehicleTypefields: any = {text: 'text', value: 'value'};
  public ownerAttachmentFrom: any;
  constructor(
    public builder: FormBuilder,
    public location: Location,
    public router: Router,
    public service: CrudOperationService,
    public actRoute: ActivatedRoute,
    public cdRef: ChangeDetectorRef,
    public httpCancelService: HttpCancelService
    ) {
    super(service);
    this.createForm();
    this.load_region();

  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }

  ngOnInit(): void {

    this.id = this.actRoute.snapshot.params.id;
    if (this.id !== undefined) {

      this.isUpdate = true;

      this.service.detail(this.id, 'vehicle/item/detail').subscribe((res: any) => {
        this.formGroup.patchValue(res.data);       
        this.load_city(res.data.region_id, res.data.owner_city, this.formGroup, 'owner_city');
        this.load_sub_city(res.data.city_id, res.data.owner_sub_city, this.formGroup, 'owner_sub_city');

       this.formGroup.get('vehicle_type_id').patchValue(res.data.vehicle_type_id);
       if(res.data.status){
         res.data.status = res.data.status === '1' ? true : false;

       }


       this.owner_image = `${environment.baseUrl}uploads/vehicle/item/owner/${this.id}?time=${new Date()}`;

       this.vehicle_image = `${environment.baseUrl}uploads/vehicle/item/${this.id}?time=${new Date()}`;
       this.ownerAttachmentFrom = `${environment.baseUrl}uploads/vehicle/item/attachment/${this.id}?time=${new Date()}`;

       this.imgFromOwner = `${environment.baseUrl}uploads/vehicle/item/owner/${this.id}?time=${new Date()}`;
       this.imgFromVehicle = `${environment.baseUrl}uploads/vehicle/item/${this.id}?time=${new Date()}`;

       this.getControl(this.formGroup, 'owner_image').setValue(this.owner_image);

       this.getControl(this.formGroup, 'owner_attachment').setValue(this.ownerAttachmentFrom);

      });
    }


    this.sendingState$.subscribe(status => {
      this.sending = status;
      this.cdRef.detectChanges();

    });

  }
  ngAfterViewInit(): void {
    document.getElementById('browseOwnerPhoto').onclick = (args) => {
        document.getElementById('owner').querySelector('button').click();
    };
    document.getElementById('browseVehiclePhoto').onclick = (args) => {
      document.getElementById('vehicle').querySelector('button').click();
    };
  }

  createForm(): void {
    this.formGroup = this.createControls(vehicle);
  }

  onTrash(type){
    this.selected = false;
    if (type == 'owner'){
      this.id !== undefined ? this.owner_image = this.imgFromOwner : this.owner_image = null;
    } else if (type == 'vehicle'){
      this.id !== undefined ? this.vehicle_image = this.imgFromVehicle : this.vehicle_image = null;
    }
  }

  uploading_file(event){
    const file = event.target.files[0];

    const filesize = file.size * 	0.000001;

    if (filesize > 10) {
        this.error = true;

    } else {

      this.error = false;
      this.convert_from_base64(this, file, 'owner_attachment', this.formGroup,false);

    }

  }

  Submit($evt){
    const payload = this.formGroup.value;

    payload.vehicle_image = this.vehicle_imageUrl ?? this.vehicle_image;
    payload.owner_image = this.owner_imageUrl ?? this.owner_image;
    payload.owner_attachment = this.owner_attachmentUrl ?? this.ownerAttachmentFrom;

    if (this.formGroup.valid && payload.vehicle_image && payload.owner_image){

      this.vehicleFormSubmitted = true;
      this.service.submit(payload, 'vehicle/item', null, $evt, this.formGroup);

    } else {
      this.vehicleFormSubmitted = true;

    }

  }

  viewFile(){
    window.open(this.ownerAttachmentFrom, '_blank');
  }



}
