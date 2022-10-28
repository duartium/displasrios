import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FullOrderReceivableResp, OrderPaymentRequest, OrderReceivableResp, SummaryOrdersOfDayResp } from '../Dtos/OrderReceivableDto.model';
import { ApiResponse } from '../models/ApiResponse';
import { VisitCreation } from '../models/VisitCreation.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url: string = environment.API_URL + "/order";

  constructor(private http: HttpClient) { 

  }

  GetOrdersReceivable(){
      return this.http.get<OrderReceivableResp>(this.url + '/receivable');
  }

  GetOrderReceivable(id: number){
      return this.http.get<FullOrderReceivableResp>(this.url + '/receivable/'+id);
  }

  GetSummaryOrdersOfDay(){
    return this.http.get<SummaryOrdersOfDayResp>(this.url + '/orders-of-day');
  }

  GetSummaryOrdersByCustomer(idCustomer: number){
    return this.http.get<SummaryOrdersOfDayResp>(this.url + '/orders-customer/'+idCustomer);
  }

  GetCollectionOfDay(){
    return this.http.get<SummaryOrdersOfDayResp>(this.url + '/collection-of-day');
  }
  
  registerPayment(orderPayment: OrderPaymentRequest){
    return this.http.post<ApiResponse>(this.url + '/receivable/pay', orderPayment);
  }

  RecordVisit(visit: VisitCreation){
    return this.http.post<ApiResponse>(this.url + '/record-visit', visit);
  }

  CancelOrder(id: string){
    return this.http.delete<ApiResponse>(this.url + '/cancel-order/'+id);
  }
  
}
