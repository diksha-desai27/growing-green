import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders}  from '@angular/common/http';
import { Router } from '@angular/router';
import { Donate } from './donate.model';
import { environment } from '../../environments/environment';
import {NotificationService} from './notification.service'; 

@Injectable({
  providedIn: 'root'
})
export class DonateService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    public router: Router,
  public notifyService:NotificationService) { }

  saveDonation(donate: any) {
    return this.http.post(environment.apiBaseUrl+'/donate', donate)
      .subscribe((res: any) => {
        console.log(res);
        // this.router.navigateByUrl['/'];
        this.notifyService.showSuccess("Thank you for donation to our organization.", "Notification");
      },(err=>this.notifyService.showError(err, "Notification")
      ))
  }
}