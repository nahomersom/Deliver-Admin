import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CrudOperationService } from '@core/utils/crud-operation.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-form-buttons',
  templateUrl: './form-buttons.component.html',
  styleUrls: ['./form-buttons.component.css']
})
export class FormButtonsComponent implements OnInit {
  @Output() public submit: EventEmitter<any> = new EventEmitter();
  @Input() showSaveNew: Boolean = true;
  public sending = false;

  public clickedBtn: any;
  constructor(public op: CrudOperationService, public location: Location, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  submitForm(evt = false) {
    this.submit.emit(evt);
  }

  cancelForm() {
    this.location.back();
  }



}
