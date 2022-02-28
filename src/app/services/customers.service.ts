import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerResponse } from '../models/Customer.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  
  private apiUrl = `${environment.API_URL}/customers`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.apiUrl);
  }
}
