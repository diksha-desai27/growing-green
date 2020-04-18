import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message, title) {
    console.log('i');
    this.toastr.success(message, title);
  }
  showError(message, error) {
    this.toastr.error(message, error);
  }

  showWraning(message,error){
    this.toastr.warning(message,error);
  }
}
