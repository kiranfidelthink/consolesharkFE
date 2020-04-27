import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationModalComponent } from 'src/app/modals/organization/organization.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userEmail: any;
  constructor(private modalService: NgbModal, private routes: Router, private auth:AuthService) {}

  ngOnInit() {
    this.getUserDetails();
    // this.openModal()
  }
  getUserDetails() {
    this.userEmail = localStorage.getItem('userEmail')
    this.auth.getUserAndOrganization(this.userEmail).subscribe((res:any) => {
      localStorage.setItem('user_id', res.id)
      console.log("res", res)
      if(res.organizations !== null){
      localStorage.setItem('organization_id', res.organizations.id)
      }
      else{
        this.openModal();
      }
    });
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
      (reason) => {
        console.log('reason--', reason);

      }
    );
  }
}
