import { T } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import {roles} from './roles';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit , OnDestroy {

  public formgroup: FormGroup;
  public disable: false;
  public formSubmitted = false;
  public id = undefined;
  public isUpdate = false;
  public for: any = [
    {text: 'Driver', value: 'driver'}, {text: 'System User', value: 'system'},
    {text: 'customer', value: 'customer'}
  ];

  public fields: any = { value: 'value', text: 'value' };

  public actions: any[] = ['canAdd','canUpdate','canDelete','canView','canViewDetail'];
   
  public localRoles: any[]  = [
    { "title": 'dashboard', "page": 'Dashboard', "canView": false },
    { "title": 'order', "page": 'Order',"canDelete": false, "canView": false, "canViewDetail": false },
    { "title": 'vehicle', "page": 'Item', "canAdd": false, "canUpdate": false, "canDelete": false, "canView": false},
    { "title": 'Vehicle Type', "page": 'Type', "canAdd": false, "canUpdate": false, "canDelete": false, "canView": false},
    { "title": 'Assign Vehicle & Driver', "page": 'Assign', "canAdd": false, "canUpdate": false, "canDelete": false, "canView": false},
    { "title": 'System User', "page": 'System', "canAdd": false, "canUpdate": false, "canDelete": false, "canView": false},
    { "title": 'Customer', "page": 'Customer', "canAdd": false, "canUpdate": false, "canDelete": false, "canView": false},
    { "title": 'Merchant', "page": 'Merchant', "canAdd": false, "canUpdate": false, "canDelete": false, "canView": false},
    { "title": 'driver', "page": 'Driver', "canAdd": false, "canUpdate": false, "canDelete": false, "canView": false},
    { "title": 'Group & Role', "page": 'Group', "canAdd": false, "canUpdate": false, "canDelete": false, "canView": false},
    { "title": 'Lookups', "page": 'Lookup', "canAdd": false, "canUpdate": false, "canDelete": false, "canView": false},
    { "title": 'System Setting', "page": 'Setting', "canAdd": false, "canUpdate": false, "canDelete": false, "canView": false},
    { "title": 'Language', "page": 'Language', "canAdd": false, "canUpdate": false, "canDelete": false, "canView": false}
  ];
  public roles:any[];
  constructor(
    public httpCancelService: HttpCancelService,
    public service?: CrudOperationService, 
    private router?: Router, 
    private actRoute?: ActivatedRoute ) {
    this.formgroup = new FormGroup({
      id : new FormControl(null),
      title : new FormControl(null, Validators.required),
      for : new FormControl(null, Validators.required),
      role : new FormControl(null),
    });
  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }

  preprocess(){
    this.roles.forEach(role => {
      let prop = this.return_prop(role);

      this.actions.forEach(action => {
        if(prop.includes(action)){
          role[action] = false;

        } else {
          role[action] = null;
          
        }

      });

    });

  }
  
  getChecked(value){
    return value === null ? false : value;
  }

  onChange(index,action,value){
    let role = this.roles[index];

    role[action] = value;
    this.roles[index] = role;

  }

  ngOnInit() {
    this.id = this.actRoute.snapshot.params.id;
    this.roles = [...this.localRoles];
    if (this.id !== undefined) {
      this.isUpdate = true;

      this.service.detail(this.id, 'user/group/detail').subscribe((res: any) => {
        this.formgroup.patchValue(res.data);


        let role = JSON.parse(res.data.role);


        let diffrence = this.roles.filter(({ page: id1 }) => !role.some(({ page: id2 }) => id2 === id1));

        this.roles = [...role,...diffrence];

        
        this.service.getControl(this.formgroup, 'for').setValue(res.data.for);

      });
    }

    this.preprocess();

  }

  Submit($evt): any {
    if (!this.formgroup.valid || !this.filter().length) {
      this.formSubmitted = true;
      return;

    } else {
      let payload =  this.formgroup.value;
      payload.project_type = 'delivery'
      payload.role = this.roles;
      this.service.submit(payload, 'user/group', null, $evt, this.formgroup);

    }
  }


  selectAll(value) {
    this.roles.forEach(element => {
      const prop = this.return_prop(element);
      prop.forEach(ele => { element[ele] !== null ? element[ele] = value : null; });
    });
  }

  return_prop(obj){
    const prop = Object.keys(obj);
    prop.shift();
    return prop.filter(ele => ele !== 'page');
  }

  filter(){
   return this.roles.filter(role => role.canAdd === true || role.canUpdate === true  ||
          role.canDelete === true || role.canView === true || role.canViewDetail === true);
  }




}
