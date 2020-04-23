import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'toast-message-modal',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.css'],
})
export class ToastMessageComponent implements OnInit {
  submitted = false;
  @Input() toastMessage: any;
  constructor(
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    console.log('this.fromParent', this.toastMessage);
  }


  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
  //  closeModal() {
  //   //   this.activeModal.close();
  //   // }
}
