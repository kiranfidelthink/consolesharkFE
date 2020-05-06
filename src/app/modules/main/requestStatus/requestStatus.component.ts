import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/shared-service/user-service';
import { CreateExistingOrgComponent } from 'src/app/modals/create-existing-org/create-existing-org.component';

@Component({
  selector: 'app-request-status',
  templateUrl: './requestStatus.component.html',
  styleUrls: ['./requestStatus.component.css'],
})
export class RequestStatusComponent implements OnInit {
  userEmail: any;
  constructor(private modalService: NgbModal, private routes: Router, private _userService: UserService) {}

  ngOnInit() {
    this.getUserDetails();
    // this.openModal()
  }
  getUserDetails() {
    this.userEmail = localStorage.getItem('userEmail')
    this._userService.getUserAndOrganization(this.userEmail).subscribe((res:any) => {
      localStorage.setItem('user_id', res.id)
      // this.getOrganization(res)
      console.log("res", res)
      if(res.organization_id !== null){
      localStorage.setItem('organization_id', res.organization_id)
      }
      else{
        // this.openModal();
      }
    });
  }
  
}
