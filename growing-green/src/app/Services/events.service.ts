import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/getAllEvents', { headers: this.headers }).pipe(
      map((res: Response) => {
        return res;
      })
    )
  }

  
  getSelectedEvent(id): Observable<any> {
    return this.http.get(environment.apiBaseUrl+'/getEvent/'+id, { headers: this.headers }).pipe(
      map((res: Response) => {
        console.log(res);
        return res;
      })
    )
  }

}
