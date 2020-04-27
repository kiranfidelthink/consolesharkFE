import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomvalidationService } from 'src/app/shared/sharedService/customValidation.service';
import { ToastrService } from 'ngx-toastr';
import { EmitService } from 'src/app/shared/shared-service/emit-service';


@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"]
})
export class UserDetailsComponent implements OnInit {
  popularApps: any = [];
  newestApps: any = [];
  userEmail: any;
  currentUserData:any;
  firstName: any;
  lastName: any;
  email: any;
  userOrganizationInfo:any;
  submittedUpdatePasswordForm = false;
  submittedOrganizationForm = false;
  submittedUserUpdateForm = false;
  updatePasswordForm: FormGroup;
  organizationForm: FormGroup;
  updateUserForm: FormGroup;


  constructor(private routes:Router, private auth:AuthService,private fb: FormBuilder,private customValidator: CustomvalidationService,
    private toastr: ToastrService, private _emitService: EmitService) {
      this._emitService.listen().subscribe((m:any) => {
        console.log(m);
        this.onFilterClick(m);
    })
    }
    onFilterClick(event) {
    this.getUserDetailsOrg();
      console.log('Fire onFilterClick: ', event);
  }
    
  curTab = 'overview';

  languages = [
    { value: 'English', label: 'English' },
    { value: 'German', label: 'German' },
    { value: 'French', label: 'French' }
  ];

  ngOnInit() {
    this.updateUserForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      }
    );
    this.updatePasswordForm = this.fb.group(
      {
        currentPassword: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.patternValidator(),
          ]),
        ],
        newPassword: [
          '',
          Validators.compose([
            Validators.required,
            this.customValidator.patternValidator(),
          ]),
        ],
        confirmNewPassword: ['', [Validators.required]],
      },
      {
        validator: this.customValidator.MatchPassword(
          'newPassword',
          'confirmNewPassword'
        ),
      }
    );
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

  showToastr(title, message) {
    this.toastr.success(title, message);
  }
  
  get updateUserFormControl() {
    return this.updateUserForm.controls;
  }
  get updatePasswordFormControl() {
    return this.updatePasswordForm.controls;
  }
  get organizationFormControl() {
    return this.organizationForm.controls;
  }
  
  getUserDetailsOrg() {
    this.userEmail = localStorage.getItem('userEmail')

    this.auth.getUserAndOrganization(this.userEmail).subscribe((res:any) => {
      console.log("resssssss of user", res)
      this.userOrganizationInfo = res.organizations;
      this.currentUserData = res
      this.firstName= this.currentUserData.first_name
      this.lastName= this.currentUserData.last_name
      this.email= this.currentUserData.email
    });
  }

  showOrganization() {
    this.curTab = 'organization';
    this._emitService.filter('Register click');
  }

  onSubmitUpdatePassword() {
    this.submittedUpdatePasswordForm = true;
    console.log("this.updatePasswordForm", this.updatePasswordForm)
    if (this.updatePasswordForm.valid) {
      const password:any = {
        currentPassword: this.updatePasswordForm.value.currentPassword,
        newPassword: this.updatePasswordForm.value.newPassword
      };
      this.auth.updatePassword(password).subscribe((res:any) => {
        console.log("updateUser res", res)
        this.updateUserDetail(this.updatePasswordForm.value.newPassword)
        // this.activeModal.close();
      });
    }
  }
  updateUserDetail(newPassword){
    this.auth.updateUserPassword(newPassword).subscribe((res:any) => {
      console.log("updateUserByOrganization res", res)
      // this.activeModal.close();
      this.showToastr("Password Updated successfully", "");
      this.routes.navigate(['/login']);
    });
  }
  
  onSubmitupdateUserOrganization(){
    console.log("Insdie submit", this.organizationForm.value)
    console.log("this.organizationForm", this.organizationForm)
    this.submittedOrganizationForm = true;
    if (this.organizationForm.valid) {
      const organization:any = {
        company_name:this.organizationForm.value.companyName,
        company_address: this.organizationForm.value.companyAddress,
            billing_contact:{
                name:this.organizationForm.value.name,
                email:this.organizationForm.value.email,
                phone:this.organizationForm.value.phone,
                cell: this.organizationForm.value.cell.dialCode+this.organizationForm.value.cell.number
            }   
        }
      
      this.auth.updateOrganization(organization).subscribe((res:any) => {
        console.log("create organization res", res)
        // this.updateUser(res.organization_id);
        // this.activeModal.close();
      });
    }
  }
  onSubmitUpdateUser(){
    this.submittedUserUpdateForm = true;
    console.log("this.update user", this.updateUserForm)
    if (this.updateUserForm.valid) {
      const user:any = {
        first_name: this.updateUserForm.value.firstName,
        last_name: this.updateUserForm.value.lastName,
        email: this.updateUserForm.value.email,
      };
      this.auth.updateUserprofile(user).subscribe((res) => {
        // console.log("register success", res)
        this.showToastr("Profile Updated successfully", "");

      });
    }
  }
  
}
