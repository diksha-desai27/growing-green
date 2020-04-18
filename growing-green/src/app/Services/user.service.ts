import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { User } from './user.model';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {NotificationService} from './notification.service';
// import { createSecretKey } from 'crypto';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router,private notifyService:NotificationService) { }

  postUser(user: User): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }

  //register using google
  socialRegister(user: any) {
    return this.http.post(environment.apiBaseUrl + '/socialRegister', user).subscribe((res:any)=>{
      console.log(res);
      if(res.status == "200") {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('_id', res.data._id);
        this.currentUser = res;
        this.router.navigate(['/my-account/' + res.data._id]);
      }
      else if(res.status == "422")
      {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('_id', res.data[0]._id);
        this.currentUser = res;
        this.router.navigate(['/my-account/' + res.data[0]._id]);
      }
      else{
        this.notifyService.showError("Error.","Notification");
      }
    });
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post(environment.apiBaseUrl + '/signin', user)
      .subscribe((res: any) => {
        if (res.status == "200") {
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('_id', res.data[0]._id);
          this.currentUser = res;
          this.router.navigate(['/my-account/' + res.data[0]._id]);
        }
        else if (res.status == "401") {
          this.notifyService.showError("Password is incorrect. Please enter a valid password. ","Notification");
        }
        else if (res.status == "201") {
          this.notifyService.showError("The user is not registered. Please register to login.","Notification");
        }
        else {
        }
      },catchError(this.handleError))
  }

  //social login
  socialLogin(user: any): any {
      return this.http.post(environment.apiBaseUrl + '/socialRegister', user).subscribe((res:any)=>{
        if(res.status == "200") {
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('_id', res.data._id);
          this.currentUser = res;
          this.notifyService.showSuccess("Registration successful..","Notification");
          this.router.navigate(['/my-account/' + res.data._id]);
        }
        else if(res.status == "422")
        {
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('_id', res.data[0]._id);
          this.currentUser = res;
          this.router.navigate(['/my-account/' + res.data[0]._id]);
        }
        else{
          this.notifyService.showError("Error.","Notification");
        }
      });
  }

  //getUserProfile
  getUserProfile(id): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/profile/' + id, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res;
      }),catchError(this.handleError)
    )
  }

  //registerEvents
  registerEvents(selectedEvent):Observable<any> {
    var id = localStorage.getItem('_id');
    return this.http.post(environment.apiBaseUrl + '/registerEvent/'+id, selectedEvent).catch(this.handleError);
  }



  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('_id');
    if (removeToken == null) {
      this.router.navigate(['/']);
    }
  }

  cancelRegistration(eventId):Observable<any>{
    var userId = localStorage.getItem('_id');
    console.log('in register');
    return this.http.delete(environment.apiBaseUrl + '/cancelEvent/'+userId+"/"+eventId).pipe(
      map((res: Response) => {
        return res;
      }), catchError(this.handleError)
    );
  }

  updateFeedback(event):Observable<any>{
    var userId = localStorage.getItem('_id');
    console.log('in register');
    return this.http.put(environment.apiBaseUrl + '/updateEvent/'+userId,event).pipe(
      map((res: Response) => {
        return res;
      }),catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `${error.message}`;
    }
    this.notifyService.showError(errorMessage,"Notification");
    return throwError(errorMessage);
}

}
