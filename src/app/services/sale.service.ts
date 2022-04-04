import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FullOrderDto } from '../Dtos/FullOrderDto.model';
import { SaleResponse } from '../models/saleResponse.model';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SaleService {
  
  private url: string = environment.API_URL + "/sales";
  constructor(private http: HttpClient) { 

  }

  create(order: FullOrderDto){
    return this.http.post(this.url, order);
  }

}
