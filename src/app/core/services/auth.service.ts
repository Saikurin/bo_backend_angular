import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(userName: string, password: string) {
    return this.http.post<any>(environment.api_url + "/auth/login/", {
      username: userName,
      password: password
    });
  }

  logout() {
    localStorage.removeItem("id_token");
  }

  register(val: any) {
    return this.http.post<any>(environment.api_url + "/auth/register/", val);
  }
}
