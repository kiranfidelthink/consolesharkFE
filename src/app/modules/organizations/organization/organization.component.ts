import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomvalidationService } from 'src/app/shared/sharedService/customValidation.service';
// import { ToastrService } from 'ngx-toastr';
import { EmitService } from 'src/app/shared/shared-service/emit-service';
import { UserService } from 'src/app/shared/shared-service/user-service';
import { ToastService } from 'src/app/shared/shared-service/toast-service';
import { CountryISO} from 'ngx-intl-tel-input';


@Component({
  selector: 'organization', // tslint:disable-line
  templateUrl: './organization.component.html',
  styleUrls: ["./organization.component.css"]
})
export class OrganizationComponent implements OnInit {
  popularApps: any = [];
  newestApps: any = [];
  userEmail: any;
  currentUserData:any;
  firstName: any;
  lastName: any;
  email: any;
  userOrganizationInfo:any;
  submittedOrganizationForm = false;
  organizationForm: FormGroup;
  CountryISO:CountryISO; 


  constructor(private routes:Router, private fb: FormBuilder,private customValidator: CustomvalidationService,
    private _emitService: EmitService, private _userService: UserService, private _toastService: ToastService) {
      this._emitService.listen().subscribe((m:any) => {
        console.log(m);
        this.updateOrganizationDetails(m);
    })
    }
    updateOrganizationDetails(event) {
    this.getUserDetailsOrg();
      console.log('Fire onFilterClick: ', event);
  }
    
  ngOnInit() {
    console.log("CountryISO==", CountryISO.India)
    this.organizationForm = this.fb.group(
      {
        companyName: ['', Validators.required],
        companyAddress: ['', Validators.required],
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.phonePatternValidator(),
          ]),
        ],
        cell: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.cellPatternValidator(),
          ]),
        ],
      }
    );
    this.getUserDetailsOrg();
  }
  get organizationFormControl() {
    return this.organizationForm.controls;
  }
  
  getUserDetailsOrg() {
    this.userEmail = localStorage.getItem('userEmail')

    this._userService.getUserAndOrganization(this.userEmail).subscribe((res:any) => {
      console.log("resssssss of user==", res)
      this.userOrganizationInfo = res.organizations;
      this.currentUserData = res
      this.firstName= this.currentUserData.first_name
      this.lastName= this.currentUserData.last_name
      this.email= this.currentUserData.email
    });
  }
  
  onSubmitupdateUserOrganization(){
    console.log("Insdie submit", this.organizationForm.value)
    console.log("this.organizationForm", this.organizationForm)
    console.log("this.organizationForm.value.cell.number", this.organizationForm.value.cell.number)
    this.submittedOrganizationForm = true;
    if (this.organizationForm.valid) {
      const organization:any = {
        company_name:this.organizationForm.value.companyName,
        company_address: this.organizationForm.value.companyAddress,
            billing_contact:{
                name:this.organizationForm.value.name,
                email:this.organizationForm.value.email,
                phone:this.organizationForm.value.phone,
                cell: this.organizationForm.value.cell.number,
                countryCode: this.organizationForm.value.cell.dialCode,
                countryISO: this.organizationForm.value.cell.countryCode
            }   
        }
      
      this._userService.updateOrganization(organization).subscribe((res:any) => {
        console.log("create organization res", res)
        this._toastService.showToastr("Organization update successfully", "");

        // this.updateUser(res.organization_id);
        // this.activeModal.close();
      });
    }
  }
}