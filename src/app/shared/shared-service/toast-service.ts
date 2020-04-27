import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {
 
  constructor(private toastr: ToastrService) {}
  showToastr(title, message) {
    this.toastr.success(title, message);
  }
  
}

