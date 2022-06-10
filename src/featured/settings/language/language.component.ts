import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpCancelService } from '@core/interceptors/HttpCancelService';
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit , OnDestroy{
  public formGroup: FormGroup;
  public formSubmitted = false;
  public id: any;
  sendingState$ = new BehaviorSubject<boolean>(false);
  sending = false;
  public languages: any[] = [];

  public disable = false;
  public fields: any = { text: 'value', value: 'value' };
  selectedLanguage: any;
  resId: any = 1;

  constructor(
    public httpCancelService: HttpCancelService,
    public crudService: CrudOperationService, public actRoute: ActivatedRoute,
              private cdRef: ChangeDetectorRef, private toastr: ToastrService, ) {
    this.formGroup = new FormGroup({
      language : new FormControl(null, Validators.required),
      keys : new FormArray([], Validators.required),
    });
  }
  ngOnDestroy(): void {
    this.httpCancelService.cancelPendingRequests();

  }
  ngOnInit() {
    this.load_language();

    this.id = this.actRoute.snapshot.paramMap.get('id');

    if (this.id !== null){
      this.crudService.detail(this.id, 'util/language/detail').subscribe((res: any) => {
        const data: any = res.data[0];
        this.add(data);
        this.formGroup.get('language').disable();
        this.load_language(data.language);

      }, () => {
        this.toastr.error(
          'Unknown error ocurred, please check your connection!',
          'Error'
        );
      });

    }

    this.sendingState$.subscribe(status => {
      this.sending = status;
      this.cdRef.detectChanges();
    });

  }


  Submit($evt){
    this.formSubmitted = true;

    if (this.formGroup.valid){
     
      this.GA().value.forEach((ele) => {
        delete ele.key;
        ele.language = this.formGroup.get('language').value;
      });
      let payload = {id : this.resId,data: this.GA().value}
      this.crudService.submit(payload, 'util/language', null, $evt, this.formGroup);

    } else{
      return;

    }

  }

  public GA(): FormArray {
    return this.formGroup.get('keys') as FormArray;
  }

  public GG(index): FormGroup {
    return this.GA().controls[index] as FormGroup;
  }

  public add(data){
    this.GA().push(
      new FormGroup({
        id: new FormControl(data.id),
        key_id: new FormControl(data.key_id),
        key: new FormControl(data.key, Validators.required),
        value: new FormControl(data.value, Validators.required),
    }));

  }


  load_keys(value){
    this.selectedLanguage = `Type your translation by ${value} language here ...`;
    this.GA().clear();
    
    this.crudService.list(`util/language/load_keys/${value}`).subscribe((res: any) => {
      if(!res.data[0].value){
        this.resId = null;    
      }
      res.data.forEach((ele) => {  this.add(ele); });
    });

  }

  load_language(value = null){
    let payload = { lookup_type: 'language',project_type:null};

    this.crudService.post(payload,'Util/Lookup/filter',true).subscribe((res: any) => {
      this.languages = res.data;
      this.formGroup.get('language').setValue(value);

    });

  }





}
