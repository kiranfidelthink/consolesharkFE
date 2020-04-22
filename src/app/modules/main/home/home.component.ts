import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationModalComponent } from 'src/app/modals/organization/organization.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.openModal()
  }

  openModal() {
    const modalRef = this.modalService.open(OrganizationModalComponent, {
      scrollable: true,
      backdrop: 'static',
      keyboard: false,
      windowClass: 'myCustomModalClass',
    });

    let data = {
      prop1: 'Some Data',
      prop2: 'From Parent Component',
      prop3: 'This Can be anything',
    };

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then(
      (result) => {
        console.log('result--', result);
      },
      (reason) => {}
    );
  }
}
