import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from '../models/ApiResponse';
import { ItemCatalogue } from '../models/ItemCatalogue.model';
import { Response } from '../models/Response.model';
import { User } from '../models/User.model';
import { environment } from './../../environments/environment';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.API_URL}/users`;

  constructor(private http: HttpClient,
    private tokenService: TokenService,
    private router: Router) { }

  getProfile(){
    return this.http.get<ApiResponse>(this.apiUrl + "/profile");
  }

  getProfiles(){
    return this.http.get<ApiResponse>(this.apiUrl + "/profiles");
  }

  getAll(){
    return this.http.get<Response<User[]>>(this.apiUrl);
  }

  create(user: User){
    return this.http.post<Response<User>>(this.apiUrl + "", user);
  }

  getCollectorsCatalog(){
    return this.http.get<Response<ItemCatalogue[]>>(this.apiUrl+ "/collectors-catalog");
  }

 

  closeSession(){
    this.tokenService.removeToken();
    
    this.router.navigate(["login"]);
    console.log('salir');
  }
  
}
