import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/ApiResponse';
import { Customer, CustomerResponse } from '../models/Customer.model';
import { CustomerFinderResp, CustomersFinderResp } from '../models/CustomerFinder.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  
  private apiUrl = `${environment.API_URL}/customers`;

  constructor(private http: HttpClient) { }

  getByIdentification(identification: string){
    return this.http.get<CustomerFinderResp>(`${environment.API_URL}/customers/identification/${identification}`);
  }

  getByNames(names: string){ 
    return this.http.get<CustomersFinderResp>(`${environment.API_URL}/customers/names/${names}`);
  }

  getAll(){
    return this.http.get<CustomerResponse>(this.apiUrl);
  }

  create(customer: Customer){
    return this.http.post<ApiResponse>(this.apiUrl, customer);
  }

}
