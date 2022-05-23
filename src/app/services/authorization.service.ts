import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  Url: string = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {
  }

  login(loginData: { email: string, password: string }) {
    return this.http.post<{
      access_token: string,
      user: {
        id: number,
        email: string,
        first_name: string,
        last_name: string
      }
    }>(this.Url + '/users/login', loginData);
  }

  registration(registrationData: { 
      email: string, 
      first_name: string,
      last_name: string, 
      password: string 
    }) {
    return this.http.post<{
      access_token: string,
      user: {
        id: number,
        email: string,
        first_name: string,
        last_name: string
      }
    }>(this.Url + '/users/registration', registrationData)
  }

  logout(){
    return this.http.post(this.Url + '/users/logout', {});
  }
}