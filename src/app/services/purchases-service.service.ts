import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { ApiResponse } from '../models/ApiResponse';
import { PurchaseCreate } from '../models/Purchase.model';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {


  constructor(private http: HttpClient) { }

  register(purchase: PurchaseCreate){
      return this.http.post<ApiResponse>(environment.API_URL + "/purchases", purchase);
  }

}
