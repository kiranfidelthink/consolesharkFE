import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/shared-service/user-service';
import { CreateExistingOrgComponent } from 'src/app/modals/create-existing-org/create-existing-org.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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
      console.log("res of get user in home component", res)
      if(res.organization_id !== null){
        console.log("Inside if")
        if(res.mfa_enabled == true){
          console.log("Inside mfs true")
          // this.openModal();
          // this.routes.navigate(['/login'], { queryParams: { mfa: res.mfa_enabled }});
  
          
        }

      localStorage.setItem('organization_id', res.organization_id)
      }
      else{
        this.openPopup();
      }
    });
  }
  // getOrganization(organization){
  //   this._userService.getUserOrganizationById(organization.id).subscribe((res:any)=>{
  //     console.log("org", res)
  //   })
  // }

  // openModal() {
  //   const modalRef = this.modalService.open(OrganizationModalComponent, {
  //     scrollable: true,
  //     backdrop: 'static',
  //     keyboard: false,
  //     windowClass: 'myCustomModalClass',
  //   });

  //   let data = {
  //     prop1: 'Some Data',
  //     prop2: 'From Parent Component',
  //     prop3: 'This Can be anything',
  //   };

  //   modalRef.componentInstance.fromParent = data;
  //   modalRef.result.then(
  //     (result) => {
        
  //       console.log('result--', result);
  //     },
  //     (reason) => {
  //       console.log('reason--', reason);

  //     }
  //   );
  // }
  openPopup(){
    this.modalService.open(CreateExistingOrgComponent, {
      scrollable: true,
      size:'lg',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'myCustomModalClass',
    });
  }
}
