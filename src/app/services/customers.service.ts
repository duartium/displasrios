import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerResponse } from '../models/Customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private apiUrl = 'http://localhost:63674/api/v1/customers';

  constructor(private http: HttpClient) { }

  getAll(){
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', `Bearer ${token}`);
    // headers = headers.set('Content-type', 'application/json');
    return this.http.get(this.apiUrl);
  }
}
