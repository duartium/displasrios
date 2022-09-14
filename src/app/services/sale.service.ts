import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FullOrderDto } from '../Dtos/FullOrderDto.model';
import { Response } from '../models/Response.model';
import { SaleResponse } from '../models/saleResponse.model';
import { SalesSellerToday } from '../models/SalesSellerToday.model';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SaleService {
  
  private url: string = environment.API_URL + "/sales";
  constructor(private http: HttpClient) { 

  }

  create(order: FullOrderDto){
    return this.http.post<SaleResponse>(this.url, order);
  }

  saveCollectorSalesToday(saleToday: SalesSellerToday){
    return this.http.post<Response<boolean>>(this.url + "/save-collector-sales", saleToday);
  }

}