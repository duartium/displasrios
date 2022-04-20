import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderReceivableResp } from '../Dtos/OrderReceivableDto.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url: string = environment.API_URL + "/order/receivable";

  constructor(private http: HttpClient) { 

  }

  GetOrdersReceivable(){
      return this.http.get<OrderReceivableResp>(this.url);
  }
}
