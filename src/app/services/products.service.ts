import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsFinderResp } from '../models/ProductFinder.model';
import { Product } from '../models/Products.model';
import { Response } from '../models/Response.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getByName(name: string){
    return this.http.get<ProductsFinderResp>(`${environment.API_URL}/products/get-for-sale/name/${name}`);
  }

  getAll(){
    return this.http.get<Response<Product[]>>(`${environment.API_URL}/products`);
  }
  
}
