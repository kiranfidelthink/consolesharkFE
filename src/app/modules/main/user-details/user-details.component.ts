import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomvalidationService } from 'src/app/shared/sharedService/customValidation.service';


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
  submittedUpdatePasswordForm = false;
  updatePasswordForm: FormGroup;


  constructor(private route:Router, private auth:AuthService,private fb: FormBuilder,private customValidator: CustomvalidationService) {}
  curTab = 'overview';

  languages = [
    { value: 'English', label: 'English' },
    { value: 'German', label: 'German' },
    { value: 'French', label: 'French' }
  ];

  accountData = {
    avatar: '5-small.png',
    name: 'Nelle Maxwell',
    username: 'nmaxwell',
    email: 'nmaxwell@mail.com',
    company: 'Company Ltd.',
    verified: false,

    info: {
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nunc arcu, dignissim sit amet sollicitudin iaculis, vehicula id urna. Sed luctus urna nunc. Donec fermentum, magna sit amet rutrum pretium, turpis dolor molestie diam, ut lacinia diam risus eleifend sapien. Curabitur ac nibh nulla. Maecenas nec augue placerat, viverra tellus non, pulvinar risus.',
      birthday: 'May 3, 1995',
      country: 'Canada',
      languages: ['English'],
      phone: '+0 (123) 456 7891',
      website: '',
      music: ['Rock', 'Alternative', 'Electro', 'Drum & Bass', 'Dance'],
      movies: ['The Green Mile', 'Pulp Fiction', 'Back to the Future', 'WALL·E', 'Django Unchained', 'The Truman Show', 'Home Alone', 'Seven Pounds'],

      twitter: 'https://twitter.com/user',
      facebook: 'https://www.facebook.com/user',
      google: '',
      linkedin: '',
      instagram: 'https://www.instagram.com/user'
    },

    notifications: {
      comments: true,
      forum: true,
      followings: false,
      news: true,
      products: false,
      blog: true
    }
  };
  ngOnInit() {
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
    this.getUserDetails();
  }

  get updatePasswordFormControl() {
    return this.updatePasswordForm.controls;
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
    });
  }
  
  getUserDetails() {
    this.userEmail = localStorage.getItem('userEmail')

    this.auth.getUSerOrganization(this.userEmail).subscribe((res:any) => {
      console.log("resssssss of user", res)
      this.currentUserData = res
      this.firstName= this.currentUserData.first_name
      this.lastName= this.currentUserData.last_name
      this.email= this.currentUserData.email
    });
  }
  
}
