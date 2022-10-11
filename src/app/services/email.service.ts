import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = `${environment.API_URL}`;
  
  constructor(private httpClient: HttpClient) { 

  }

  sendReceipt(idInvoice: number){
    console.log('servicio EMAIL',idInvoice);
      return this.httpClient.post<ApiResponse>(this.apiUrl + "/sales/send-receipt", idInvoice);
  }

}
