import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/ApiResponse';
import { ProductsFinderResp } from '../models/ProductFinder.model';
import { Product } from '../models/Products.model';
import { Response } from '../models/Response.model';
import { UpdateStock } from '../models/UpdateStock.model';
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

  create(product: Product){
      return this.http.post<Response<string>>(`${environment.API_URL}/products`, product);
  }

  getCurrentStock(id: number){
    return this.http.get<Response<number>>(`${environment.API_URL}/products/current-stock/${id}`);
  }

  IncreaseStock(updateStock: UpdateStock){
    return this.http.post<Response<boolean>>(`${environment.API_URL}/products/increase-stock`, updateStock);
  }

  DecreaseStock(updateStock: UpdateStock){
    return this.http.post<Response<boolean>>(`${environment.API_URL}/products/decrease-stock`, updateStock);
  }
  
}
