import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserConnected } from '../models/userConnected.model';

@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {

  URL_API_LOGIN : string = "/api/login" as const;
  URL_API_AUTH : string = "/api/auth" as const;

  constructor(private http : HttpClient) { 

  }

  PostLogin(login : string, pwd : string) : Observable<UserConnected> {
    let data : string = "login=" + login + "&pwd=" + pwd;
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<UserConnected>(this.URL_API_LOGIN, data, httpOption);
  }
}
