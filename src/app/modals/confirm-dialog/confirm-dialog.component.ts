import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';


// import * as data from '../../shared/shared-service/countryList.json';

@Component({
  selector: 'confirm-dialog-modal',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogCOmponent implements OnInit {
  @Input() public site;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
     constructor(public activeModal: NgbActiveModal) {}

     ngOnInit() {
      console.log(this.site);
     }

     onConfirm(value) {
        this.activeModal.close(value);
        }
        // onConfirm(value){
        //   console.log("value", value)
        //   this.activeModal.close(value)
        // }
}