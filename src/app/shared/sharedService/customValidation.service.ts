import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
  contactPatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      // console.log("control", control)
      // console.log("control.value", control.value)
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^\\+?\\d{10}$');
      // const regex = new RegExp('^(?!0+$)(?:\\(?\\+\\d{1,3}\\)?[- ]?|0)?\\d{10}$');
      const valid = regex.test(control.value.number);
      // console.log("valid", valid)
      return valid ? null : { invalidContactNumber: true };
    };
  }
  otpPatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^\\+?\\d([0-9]{4})$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidOTP: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  phonePatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^\\+?\\d{10}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPhone: true };
    };
  }

  cellPatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      // console.log("control", control)
      // console.log("control.value", control.value)
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^\\+?\\d{10}$');
      // const regex = new RegExp('^(?!0+$)(?:\\(?\\+\\d{1,3}\\)?[- ]?|0)?\\d{10}$');
      const valid = regex.test(control.value.number);
      // console.log("valid", valid)
      return valid ? null : { invalidCell: true };
    };
  }

  // userNameValidator(userControl: AbstractControl) {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       if (this.validateUserName(userControl.value)) {
  //         resolve({ userNameNotAvailable: true });
  //       } else {
  //         resolve(null);
  //       }
  //     }, 1000);
  //   });
  // }

  validateUserName(userName: string) {
    const UserList = ['ankit', 'admin', 'user', 'superuser'];
    return (UserList.indexOf(userName) > -1);
  }
}