import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string){
    localStorage.setItem('displasrios_access_token', token);
  }

  getToken(): string{
      return localStorage.getItem('displasrios_access_token');
  }

  removeToken(){
    localStorage.removeItem('displasrios_access_token');
  }

}
