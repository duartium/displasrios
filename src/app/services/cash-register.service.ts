import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterService {

  private url: string = environment.API_URL + "/cash-register";
  constructor(private http: HttpClient) { }

  isOpenedCash(){
    return this.http.get<ApiResponse>(this.url);
  }

  open(initialValue: number){
    return this.http.post<ApiResponse>(this.url + "/open", initialValue);
  }

  close(value: number){
    return this.http.post<ApiResponse>(this.url + "/close", value);
  }

}
