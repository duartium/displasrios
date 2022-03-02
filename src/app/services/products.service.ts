import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/customers`;

  constructor(private http: HttpClient) { }

  getByName(name: string){
    return this.http.get(`${environment.API_URL}/customers/identification/${name}`);
  }

}
