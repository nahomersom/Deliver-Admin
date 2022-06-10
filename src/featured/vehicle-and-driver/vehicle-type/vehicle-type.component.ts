
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { Base } from '@core/utils/base';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { environment } from '@environments/environment';
import { SwitchComponent } from '@syncfusion/ej2-angular-buttons';
import { BehaviorSubject } from 'rxjs';
import { VehicleTypeData } from './vehicle-type.model';
import { vehicleType } from './vehicleType-contorl';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css']
})
export class VehicleTypeComponent extends Base implements OnInit, OnDestroy {
  @ViewChild('switch')
  public switch: SwitchComponent;

  public autoUpload = false;
  selected = false;
  imageUrl: any;
  image: any;

  vehicleTypeForm: FormGroup;
  formSubmitted = false;
  sendingState$ = new BehaviorSubject<boolean>(false);
  sending = false;
  vehicleData: any;
  parent: any;
  public fields: any = { text: 'value', value: 'value' };
  public id = undefined;
  public isUpdate = false;
  public imgFrom: any = null;
  constructor(
    public httpCancelService: HttpCancelService,
    public service: CrudOperationService,
    private actRoute?: ActivatedRoute,
  ) {
    super(service);
    this.createForm();
  }


  ngOnInit(): void {
  
    this.load_parent();
  

    this.id = this.actRoute.snapshot.params.id;


    if (this.id !== undefined) {
      this.isUpdate = true;

      this.service.detail(this.id, 'vehicle/type/detail').subscribe((res: any) => {
        res.data.status = res.data.status === '1' ? true : false;
        
        this.vehicleTypeForm.get('detail').patchValue(res.data)
        this.vehicleTypeForm.patchValue(res.data);
        this.image = `${environment.baseUrl}uploads/vehicle/type/${this.id}?time=${new Date()}`;
        this.imgFrom = `${environment.baseUrl}uploads/vehicle/type/${this.id}?time=${new Date()}`;

        this.getControl(this.vehicleTypeForm, 'image').setValue(this.image);
      });
    }




  }
  ngAfterViewInit(): void {
    document.getElementById('browse').onclick = (args) => {
      document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
    };
  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }


  createForm(): void {
    this.vehicleTypeForm = this.createControls(vehicleType);
  }

  onTrash() {
    this.selected = false;
    this.id !== undefined ? this.image = this.imgFrom : this.image = null;
  }
  load_status() {
    this.service.list('vehicle/type').subscribe((res: any) => {
      this.vehicleData = res.data;

    });
  }
  load_parent() {
    const payload = { lookup_type: 'vehicle_parent_type' };

    this.load_lookup(payload);


  }
  onToogle() {

    if (this.switch.value == '1') {
      this.switch.value = '0';
      this.vehicleTypeForm.get('status').setValue(this.switch.value);
    }
    else {
      this.switch.value = '1';
      this.vehicleTypeForm.get('status').setValue(this.switch.value);
    }

  }


  Submit($evt) {
    const payload = this.vehicleTypeForm.value;
    payload.image = this.imageUrl ?? this.image;
    console.log(payload)
    payload.status = payload.status ? 1 : 0;
    if (this.vehicleTypeForm.valid && payload.image) {
      this.formSubmitted = true;
      this.service.submit(payload, 'vehicle/type', null, $evt, this.vehicleTypeForm);
    } else {
      this.formSubmitted = true;
      return;
    }
  }


}
