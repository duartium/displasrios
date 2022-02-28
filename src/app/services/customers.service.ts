import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerResponse } from '../models/Customer.model';
import { environment } from './../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  
  private apiUrl = `${environment.API_URL}/customers`;

  constructor(private http: HttpClient) { }

  getByIdentification(identification: string){
    return this.http.get(`${environment.API_URL}/customers/identification/${identification}`);
  }

  getAll(){
    return this.http.get(this.apiUrl);
  }
}
