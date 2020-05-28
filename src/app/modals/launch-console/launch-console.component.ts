import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

// import * as data from '../../shared/shared-service/countryList.json';

@Component({
  selector: 'launch-console-modal',
  templateUrl: './launch-console.component.html',
  styleUrls: ['./launch-console.component.css'],
})
export class launchConsoleComponent implements OnInit {
  @Input() public element;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    console.log('this.element----', this.element);
  }

  onConfirm(value) {
    this.activeModal.close(value);
  }
  // onConfirm(value){
  //   console.log("value", value)
  //   this.activeModal.close(value)
  // }
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
