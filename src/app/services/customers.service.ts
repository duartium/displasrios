import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

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
