
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { BehaviorSubject } from 'rxjs';
import { AssignAgentData } from './assign-agent.model';
import { environment } from '@environments/environment';
import { ActivatedRoute } from '@angular/router';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { Base } from '@core/utils/base';
import { assign } from './assign-control';
@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent extends Base implements OnInit , OnDestroy{
  public data: string[] = ['Snooker', 'Tennis', 'Cricket', 'Football', 'Rugby'];
  id = undefined;
  start_date: Date = null;
  end_date: Date = null;
  toggle = false;
  assignAgentFormGroup: FormGroup;
  assignAgentFormSubmitted = false;
  minEndDateValue: any;
  sendingState$ = new BehaviorSubject<boolean>(false);
  sending = false;
  driverData: any;
  vehicleTypeList: any;
  vehicleId: any = null;
  vehicleList: any;
  driverName: any;
  vehicleName: string;
  driverImage: any;
  vehicleImage: any;
  full_name: string;
  public isUpdate = false;
  public fields: any = { text: 'text', value: 'value' };
  vehicleTypeId: any;
  constructor(
    public httpCancelService: HttpCancelService,
    public datePipe: DatePipe,
    private cdRef: ChangeDetectorRef,
    public service: CrudOperationService,
    private actRoute?: ActivatedRoute
  ) {
    super(service);
   this.createForm();



  }
 ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }
  ngOnInit(): void {
    this.load_vehicle_type();
    this.id = this.actRoute.snapshot.params.id;


    if (this.id !== undefined) {
      this.isUpdate = true;
      this.toggle = true;

      this.service.detail(this.id, 'vehicle/assign/detail').subscribe((res: any) => {

        res.data.status = res.data.status === '1' ? true : false;
        this.full_name = res.data.full_name;
        this.driverData = [{text:res.data.full_name,value:res.data.full_name}]
        const parsedDate = JSON.parse(res.data.date);

        this.load_vehicle(res.data.vehicle_type_id, res.data.vehicle_id);
        this.start_date = new Date(parsedDate.start_date);
        this.end_date = new Date(parsedDate.end_date);

        this.assignAgentFormGroup.get('start_date').patchValue(this.start_date);
        this.assignAgentFormGroup.get('end_date').patchValue(this.end_date);
        this.assignAgentFormGroup.get('client').patchValue(JSON.parse(res.data.client));
        this.assignAgentFormGroup.patchValue(res.data);
        this.vehicleTypeId = res.data.vehicle_type_id;
        this.driverImage = `${environment.baseUrl}uploads/user/profile_image/${res.data.driver_id}`;
        this.vehicleImage = `${environment.baseUrl}uploads/vehicle/item/${res.data.vehicle_id}`;

      });
    }

    this.sendingState$.subscribe(status => {
      this.sending = status;
      this.cdRef.detectChanges();

    });

  }
  // validating the form
  createForm(): void {
    this.assignAgentFormGroup = this.createControls(assign);
  }


  // toggle the end date based start date
  openEndDate(event){
  this.toggle = true;
  this.minEndDateValue = event.value;
  }

  load_drivers: EmitType<any> = (e: FilteringEventArgs) => {
    this.service.post({ keyword: e.text }, 'user/driver/load_driver').subscribe((res: any) => {
      e.updateData(res.data);
    });
  }

  load_vehicle_type(){
    this.service.list('vehicle/type/load_vehicle_type').subscribe((res: any) => {
      this.vehicleTypeList = res.data;
      this.assignAgentFormGroup.get('vehicle_type_id').setValue(this.vehicleTypeId);
    });
  }

  load_vehicle(value, actual_value= null){

    this.vehicleId = value;

    this.service.list('vehicle/assign/load_vehicle/' + this.vehicleId).subscribe((res: any) => {
      this.vehicleList = res.data;
      this.assignAgentFormGroup.get('vehicle_id').setValue(actual_value);
    });
  }
  loadVehicleDetail(e){
    this.vehicleName = e.itemData.text;
    this.vehicleImage = environment.baseUrl + e.itemData.image;
  }
  getDriveDetail(e){
   this.driverName = e.itemData.text;

   this.driverImage = environment.baseUrl + e.itemData.image;

  }

  // prepareData(): AssignAgentData {
  //   const data = new AssignAgentData();
  //   if (this.assignAgentFormGroup.valid) {
  //     data.id = this.crudService.getControl(this.assignAgentFormGroup, 'id').value;
  //     data.client = JSON.stringify(this.crudService.getControl(this.assignAgentFormGroup,'client').value);
  //     data.driver_id = this.crudService.getControl(this.assignAgentFormGroup, 'driver_id').value;
  //     data.vehicle_id = this.crudService.getControl(this.assignAgentFormGroup, 'vehicle_id').value;
  //     data.date.start_date = this.datePipe.transform(this.crudService.getControl(this.assignAgentFormGroup, 'start_date').value, 'yyyy-MM-dd');
  //     data.date.end_date = this.datePipe.transform(this.crudService.getControl(this.assignAgentFormGroup, 'end_date').value, 'yyyy-MM-dd');

  //   }
  //   return data;
  // }

  Submit($evt){
    const payload = this.assignAgentFormGroup.value;
    payload.client = JSON.stringify(payload.client);
    payload.date = { 
      start_date:new Date(payload.start_date + 'UTC'), 
      end_date:new Date(payload.end_date + 'UTC')
    }
    delete payload.start_date
    delete payload.end_date
    delete payload.vehicle_type_id
    if (this.assignAgentFormGroup.valid){
  this.assignAgentFormSubmitted = true;
  this.service.submit(payload, 'vehicle/assign', null, $evt, this.assignAgentFormGroup);
  } else {
  this.assignAgentFormSubmitted = true;
  return;
  }
    }
  }

