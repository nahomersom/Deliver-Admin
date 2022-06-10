
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CrudOperationService } from './crud-operation.service';


export class Base{
    public lookup_data: any = {};
    public vehicleTypeList: any;
    public selected: boolean;
  groupList: any;

    constructor(

      public service: CrudOperationService,

    ) {
 
      this.load_vehicle_type();
    }

  // navigate(endpoint: any) {
  //   if (typeof endpoint === 'object') {
  //     this.router.navigate([`${location.pathname}/${endpoint.id}/update`]);
  //   } else { this.router.navigate([endpoint]); }
  // }

  // back() {
  //   this.location.back();
  // }


  public getControl(formGroup: FormGroup, name: any): FormControl {
    return formGroup.get(name) as FormControl;
  }

  public convertInputToNumber(value: any): boolean{
    const charCode = (value.which) ? value.which : value.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
    return true;
  }

  load_lookup(payload, reset_key = null, control: FormControl = null, actual_value = null) {
    this.lookup_data[reset_key] = [];
    payload.project_type = 'delivery';
    this.service.post(payload, 'Util/Lookup/filter',true).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.lookup_data[payload.lookup_type] = data.data;

        control ? control.patchValue(actual_value) : null;

      }
    });
  }

  load_region(){
    const payload = { lookup_type: 'region'};
    this.load_lookup(payload, 'city');
  }

  load_city(value, actual_value, fg: FormGroup, name){
    const payload = { parent_id: value, lookup_type: 'city'};

    const control: any = fg.get(name);

    this.load_lookup(payload, 'sub_city', control, actual_value);
  }

  load_sub_city(value, actual_value, fg: FormGroup, name){

    const payload = { parent_id: value, lookup_type: 'sub_city'};

    const control: any = fg.get(name);
    

    this.load_lookup(payload, null, control, actual_value);
  }

  createControls(data: any[]): FormGroup {
    const formGroup = new FormGroup({});

    data.forEach(ele => {
      if (ele.group) {
        const FG = new FormGroup({});

        ele.child.forEach(chi => {
          FG.setControl(chi.name, new FormControl(chi.defaultValue, chi.validation));
        });

        formGroup.setControl(ele.name, FG);

      }
      else if (ele.is_array) {
        formGroup.setControl(ele.name, new FormArray([], ele.validation));

      }
      else {
        formGroup.setControl(ele.name, new FormControl(ele.defaultValue, ele.validation));

      }
    });

    return formGroup;

  }

  convert_from_base64(compo, file, name,formGroupName, img = true){
    const extension = file.name.split('.').pop();
    compo.selected = !compo.selected;
    const reader = new FileReader();

    reader.readAsDataURL(img ? file.rawFile : file);
    reader.onload = (_event) => {
       compo[name] = reader.result;
       compo[name + 'Url'] = reader.result + ',' + extension;

       compo[formGroupName].get(name)?.setValue(reader.result);
    };

  }

  load_vehicle_type(){
    this .service.list('vehicle/type/load_vehicle_type').subscribe((res: any) => {
      this.vehicleTypeList = res.data;
    });
  }

  // to accept only number
  numberOnly(event) {
   return this.convertInputToNumber(event);

  }

  load_group(payload) {
    this.service.post(payload, 'user/group/load_group').subscribe((res: any) => {
      this.groupList = res.data;

    });


}
}