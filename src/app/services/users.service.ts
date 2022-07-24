import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/ApiResponse';
import { Response } from '../models/Response.model';
import { User } from '../models/User.model';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.API_URL}/users`;

  constructor(private http: HttpClient) { }

  getProfile(){
    return this.http.get<ApiResponse>(this.apiUrl + "/profile");
  }

  getProfiles(){
    return this.http.get<ApiResponse>(this.apiUrl + "/profiles");
  }

  getAll(){
    return this.http.get<Response<User[]>>(this.apiUrl);
  }
  
}
