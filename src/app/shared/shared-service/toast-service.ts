import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {
 
  constructor(private toastr: ToastrService) {}
  showSuccessToastr(title, message) {
    this.toastr.success(title, message);
  }
  showErrorToastr(title, message) {
    this.toastr.error(title, message);
  }
  
}

